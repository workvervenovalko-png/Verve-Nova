import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import VerveApplication from '@/models/Application';
import { resend } from '@/lib/resend';
import { getAssessmentReminderTemplate } from '@/lib/mail-templates';

// Ensure this runs purely on the server and is not statically cached
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    // Basic security for manual triggers, though Vercel Cron will hit it automatically
    // You can add an Authorization header check if needed for extra security

    await dbConnect();
    const now = new Date();
    
    // Find applications that are in Assessment state and haven't completed it
    const pendingAssessments = await VerveApplication.find({
      status: 'Assessment',
      'assessment.status': 'Pending',
      'assessment.invitedAt': { $exists: true }
    }).populate('userId', 'name email');

    let emailsSent = 0;

    for (const app of pendingAssessments) {
      const invitedAt = new Date(app.assessment.invitedAt);
      const hoursSinceInvite = (now.getTime() - invitedAt.getTime()) / (1000 * 60 * 60);

      // We only care about applications that are older than 24 hours but haven't expired (48 hours)
      if (hoursSinceInvite >= 24 && hoursSinceInvite <= 48) {
        
        const lastReminder = app.assessment.lastReminderSentAt ? new Date(app.assessment.lastReminderSentAt) : null;
        let hoursSinceLastReminder = 999;
        
        if (lastReminder) {
          hoursSinceLastReminder = (now.getTime() - lastReminder.getTime()) / (1000 * 60 * 60);
        }

        // Send a reminder if 5 hours have passed since the last reminder (or if no reminder was ever sent)
        if (hoursSinceLastReminder >= 5) {
          const user = app.userId as any;
          if (user && user.email) {
            const assessmentLink = `https://vervenovatech.com/assessment/${app._id}`;

            try {
              await resend.emails.send({
                from: 'Verve Nova Tech <careers@vervenovatech.com>',
                to: user.email,
                subject: `URGENT: Assessment Deadline Approaching // VERVE NOVA`,
                html: getAssessmentReminderTemplate(user.name, assessmentLink),
              });

              // Update DB tracking
              app.assessment.lastReminderSentAt = now;
              app.assessment.remindersSentCount = (app.assessment.remindersSentCount || 0) + 1;
              await app.save();

              emailsSent++;
            } catch (mailErr) {
              console.error(`Failed to send reminder to ${user.email}`, mailErr);
            }
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Cron executed successfully. Processed ${pendingAssessments.length} pending apps. Sent ${emailsSent} reminders.`
    });

  } catch (error: any) {
    console.error("Cron Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

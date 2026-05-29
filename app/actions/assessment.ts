"use server";

import dbConnect from "@/lib/mongodb";
import VerveApplication from "@/models/Application";
import { getQuestionsForRole } from "@/lib/assessment-questions";

export async function getAssessmentState(appId: string) {
  try {
    await dbConnect();
    const app = await VerveApplication.findById(appId).populate('userId', 'name email');
    if (!app) return { success: false, error: "Application not found." };
    
    if (app.status !== 'Assessment') {
      return { success: false, error: "Candidate is not in the Assessment stage." };
    }

    return { 
      success: true, 
      data: {
        candidateName: app.userId?.name,
        roleSlug: app.roleSlug,
        assessment: app.assessment || { status: 'Pending' }
      }
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function startAssessment(appId: string) {
  try {
    await dbConnect();
    const app = await VerveApplication.findById(appId);
    if (!app) return { success: false, error: "Application not found." };

    if (app.status !== 'Assessment') {
      return { success: false, error: "Candidate is not in the Assessment stage." };
    }

    if (app.assessment?.status === 'Completed') {
      return { success: false, error: "Assessment already completed." };
    }

    if (app.assessment?.status !== 'In Progress') {
      await VerveApplication.findByIdAndUpdate(appId, {
        assessment: {
          startedAt: new Date(),
          status: 'In Progress'
        }
      });
    }

    return { success: true, startedAt: app.assessment?.startedAt || new Date() };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function submitAssessment(appId: string, userAnswers: Record<string, number>) {
  try {
    await dbConnect();
    const app = await VerveApplication.findById(appId).populate('userId', 'name email');
    if (!app) return { success: false, error: "Application not found." };

    if (app.assessment?.status === 'Completed') {
      return { success: false, error: "Assessment already submitted." };
    }

    const questions = getQuestionsForRole(app.roleSlug);
    let score = 0;

    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctOptionIndex) {
        score++;
      }
    });

    await VerveApplication.findByIdAndUpdate(appId, {
      assessment: {
        score,
        totalQuestions: questions.length,
        startedAt: app.assessment?.startedAt || new Date(),
        submittedAt: new Date(),
        status: 'Completed'
      }
    });

    // Send Completion Email
    try {
      const { resend } = await import("@/lib/resend");
      const { getAssessmentSubmittedTemplate } = await import("@/lib/mail-templates");
      const targetEmail = (app.userId as any).email;
      
      await resend.emails.send({
        from: 'Verve Nova Tech <careers@vervenovatech.com>',
        to: targetEmail,
        subject: `ASSESSMENT SUBMITTED // VERVE NOVA`,
        html: getAssessmentSubmittedTemplate((app.userId as any).name),
      });
      
      // Admin notification
      await resend.emails.send({
        from: 'Verve Nova Tech <system@vervenovatech.com>',
        to: 'work.vervenova.lko@gmail.com',
        subject: `ASSESSMENT COMPLETED: ${(app.userId as any).name} // SCORE: ${score}/${questions.length}`,
        html: `<p>Candidate ${(app.userId as any).name} has completed the assessment for ${app.roleSlug}.<br/>Score: <strong>${score}/${questions.length}</strong>.</p>`
      });

    } catch (mailError) {
      console.error("Mail Dispatch Error:", mailError);
    }

    return { success: true, score, totalQuestions: questions.length };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

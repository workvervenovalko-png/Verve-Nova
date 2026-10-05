require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const { Resend } = require('resend');

// Load Resend client setup
const apiKeys = (process.env.RESEND_API_KEY || '').split(',').map(k => k.trim()).filter(Boolean);
if (apiKeys.length === 0) {
    console.error("Missing RESEND_API_KEY in environment");
    process.exit(1);
}
const clients = apiKeys.map(key => new Resend(key));

async function sendMail(options) {
    let lastError = null;
    for (let i = 0; i < clients.length; i++) {
        try {
            const currentOptions = { ...options };
            if (i > 0 && currentOptions.from) {
                currentOptions.from = currentOptions.from.replace('@vervenovatech.com', '@vervenovatechcrm.online');
            }
            console.log(`Sending to: ${currentOptions.to} (Using Key #${i + 1})`);
            const result = await clients[i].emails.send(currentOptions);
            if (result.error) {
                console.log(`Resend Key ${i+1} failed with error: ${result.error.message}, trying next key...`);
                lastError = result.error;
                continue;
            }
            return result;
        } catch (error) {
            console.log(`Resend Key ${i+1} threw error: ${error.message}, trying next key...`);
            lastError = error;
            continue;
        }
    }
    return { error: lastError || new Error("All Resend keys failed.") };
}

async function run() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false });
        console.log("Connected successfully!");

        const db = mongoose.connection.db;
        console.log("Fetching Accepted applications...");
        const list = await db.collection('verveapplications').find({ status: 'Accepted' }).toArray();
        console.log(`Found ${list.length} Accepted candidates.`);

        const isDryRun = process.argv.includes('--dry-run');
        if (isDryRun) {
            console.log("--- DRY RUN MODE: No emails will be sent ---");
        }

        for (const app of list) {
            const email = app.personal && app.personal.email;
            const name = app.personal && app.personal.fullName;
            const roleSlug = app.roleSlug;
            
            if (!email || !name) {
                console.log(`Skipping candidate (missing email or name):`, app._id);
                continue;
            }

            const roleName = roleSlug === 'campus-ambassador' ? 'Campus Ambassador' : 'Internship';

            const subject = "ACTION REQUIRED: Complete Your Onboarding & Get Featured // VERVE NOVA";
            const html = `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; color: #333333;">
                <h2 style="color: #4f46e5; text-transform: uppercase; font-weight: 900; letter-spacing: 1px;">Welcome to Verve Nova Technologies!</h2>
                <p>Hi ${name},</p>
                <p>Congratulations once again on your selection for the <strong>${roleName}</strong> role at Verve Nova Technologies!</p>
                <p>As we prepare for your official onboarding and credentials generation, please complete the following steps as soon as possible:</p>
                
                <ol style="line-height: 1.6;">
                  <li style="margin-bottom: 15px;">
                    <strong>Verify Your Identity</strong><br>
                    Please reply directly to this email with a clear scanned copy or photo of your Government ID (Aadhar/PAN) or your valid College ID.
                  </li>
                  <li style="margin-bottom: 15px;">
                    <strong>Send Your Photo for Welcome Banner</strong><br>
                    Our design team is creating custom "Welcome Aboard" banners to feature our new cohort on Verve Nova's official LinkedIn and Instagram pages. Please reply to this email with a clean, professional headshot photograph of yourself.
                  </li>
                  <li style="margin-bottom: 15px;">
                    <strong>Share the Good News on LinkedIn</strong><br>
                    We would love for you to share your selection and highlight your new role with your professional network. Feel free to share your achievement on LinkedIn in your own words (about your journey or selection), and don't forget to tag <strong>Verve Nova Technologies</strong> so we can celebrate and repost your post!
                  </li>
                </ol>
                
                <p>Please reply directly to this email and attach the requested documents so our HR team can verify and issue your official joining credentials.</p>
                <p>We are excited to have you on board!</p>
                <p style="margin-top: 30px; border-top: 1px solid #eeeeee; padding-top: 10px; font-size: 12px; color: #777777;">
                  Best regards,<br>
                  <strong>HR Team, Verve Nova Technologies</strong>
                </p>
              </div>
            `;

            if (isDryRun) {
                console.log(`[DRY-RUN] Would send email to ${name} (${email}) for role ${roleName}`);
            } else {
                const res = await sendMail({
                    from: 'Verve Nova Tech <careers@vervenovatech.com>',
                    to: email,
                    replyTo: 'work.vervenova.lko@gmail.com',
                    subject: subject,
                    html: html
                });
                if (res.error) {
                    console.error(`Failed to send to ${name} (${email}):`, res.error.message);
                } else {
                    console.log(`Successfully sent email to ${name} (${email}). ID: ${res.data && res.data.id}`);
                }
                // Sleep for 300ms to be gentle with rate limits
                await new Promise(r => setTimeout(r, 300));
            }
        }

        console.log("All processed.");
        process.exit(0);
    } catch (err) {
        console.error("Critical script error:", err);
        process.exit(1);
    }
}

run();

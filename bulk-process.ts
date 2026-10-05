import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import mongoose from "mongoose";
import { resend } from "./lib/resend";
import { getStatusTemplate, getAssessmentInviteTemplate } from "./lib/mail-templates";

import User from "./models/User";
import VerveApplication from "./models/Application";

const rawList = `
1 Ankit Kumar Sharma Accept
2 Hariprasath M Reject
3 Mohana Sri Accept
4 Antim Yadav Reject
5 Tejaswi Sonal Accept
6 Pawan Shah Accept
7 Abhijeet Tiwari Reject
8 Tejas Avinash Patil Accept
9 Aniket Singh Accept
10 Siddhant Bansode Accept
11 Md Shadab Hussain Reject
12 Tejas Bhalla Accept
13 Mohd Zahid Shaikh Accept
14 Kumaraswamy Manda Accept
15 Kirti Verma Reject
16 Sumit Kumar Sharma Reject
17 Abhijay Yadav Accept
18 Mohammed Danish Accept
19 Katha Pawale Accept
20 Sourav Reject
21 Amruta Kulkarni Reject
22 Chirag Ananda Kumar Accept
23 Shiva Shankar Reddy Accept
24 Reshu Tyagi Reject
25 Ankit Singh Accept
26 Ankit Singh Kushwah Accept
27 Yuvrajsinh Jadeja Accept
28 Jayasri Kunche Reject
29 Anish Accept
30 Poorvika L Accept
31 Pothineni Rahini Sai Accept
32 Shravani Aher Reject
33 Ashwini Moorthy Accept
34 Sree Darshini Kannan Accept
35 Kalaiyarasi S Accept
36 Jahid Shaikh Accept
37 Gajjar Dhyey Dipesh Reject
38 Gokul Selvan A Accept
39 Vipin Gupta Accept
40 Urvashi Vankar Accept
41 Chandan Kumar Jha Reject
42 Sarada Kuna Reject
43 Shifnal Shyju P Accept
44 Yug Pandav Reject
45 Rithuraj N Accept
46 Ramdutt Sharma Accept
47 Abhiraj Ravindra Kochale Accept
48 Amrita Rajesh Accept
49 Ayush Mishra Accept
50 Jagni Bhagat Reject
`;

async function processCandidates() {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to MongoDB.");

    const lines = rawList.trim().split('\n');
    let processed = 0;
    
    for (const line of lines) {
        const parts = line.trim().split(' ');
        const id = parts.shift();
        let status = parts.pop(); 
        const name = parts.join(' ').trim();
        
        // Exclude the missing/duplicates
        const excludeList = [
            'Antim Yadav', 'Kumaraswamy Manda', 'Chirag Ananda Kumar', 
            'Shiva Shankar Reddy', 'Ankit Singh Kushwah', 'Chandan Kumar Jha',
            'Pawan Shah', 'Sourav', 'Amrita Rajesh'
        ];
        
        if (excludeList.includes(name)) {
            console.log(`Skipping ${name} (In exclude list)`);
            continue;
        }

        const targetStatus = status === 'Accept' ? 'Assessment' : 'Rejected';

        const user = await User.findOne({ name: new RegExp('^' + name + '$', 'i') });
        if (!user) {
            console.log(`User not found: ${name}`);
            continue;
        }

        const app = await VerveApplication.findOne({ userId: user._id });
        if (!app) {
            console.log(`Application not found for User: ${name}`);
            continue;
        }

        // Update Application Status
        let updatePayload: any = { $set: { status: targetStatus } };
        if (targetStatus === 'Assessment') {
            updatePayload.$set['assessment.invitedAt'] = new Date();
            updatePayload.$set['assessment.status'] = 'Pending';
        }

        await VerveApplication.findByIdAndUpdate(app._id, updatePayload);
        
        console.log(`Updated ${name} to ${targetStatus}. Sending Email to ${user.email}...`);

        try {
            if (targetStatus === 'Assessment') {
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vervenovatech.com';
                const assessmentLink = `${baseUrl}/assessment/${app._id}`;
                
                await resend.emails.send({
                  from: 'Verve Nova Tech <careers@vervenovatech.com>',
                  to: user.email,
                  subject: `ASSESSMENT ROUND INVITATION // VERVE NOVA`,
                  html: getAssessmentInviteTemplate(user.name, assessmentLink),
                });
            } else {
                await resend.emails.send({
                  from: 'Verve Nova Tech <careers@vervenovatech.com>',
                  to: user.email,
                  subject: `APPLICATION REJECTED // VERVE NOVA`,
                  html: getStatusTemplate(user.name, 'Rejected'),
                });
            }
            console.log(`✅ Email sent successfully to ${name}`);
            processed++;
            // Delay to respect rate limits (2 req/sec)
            await new Promise(r => setTimeout(r, 600));
        } catch (err: any) {
            console.log(`❌ Failed to send email to ${name}: ${err.message}`);
        }
    }

    console.log(`\nFinished processing ${processed} candidates.`);
    process.exit(0);
}

processCandidates().catch(console.error);

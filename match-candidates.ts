import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import mongoose from "mongoose";

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

async function testMatch() {
    await mongoose.connect(process.env.MONGODB_URI!);
    
    // Using native driver approach
    const db = mongoose.connection.db;
    if (!db) {
        console.error("DB connection failed");
        process.exit(1);
    }
    
    const lines = rawList.trim().split('\n');
    let matched = 0;
    let notFound = [];
    let duplicates = [];
    
    for (const line of lines) {
        const parts = line.trim().split(' ');
        const id = parts.shift(); // remove number
        const status = parts.pop(); // remove status
        const name = parts.join(' ').trim();
        
        const users = await db.collection('users').find({ name: new RegExp('^' + name + '$', 'i') }).toArray();
        if (users.length === 0) {
            notFound.push(name);
        } else if (users.length > 1) {
            duplicates.push(name);
        } else {
            matched++;
        }
    }
    
    console.log(`Matched: ${matched}`);
    console.log(`Not Found: ${notFound.length} ->`, notFound);
    console.log(`Duplicates: ${duplicates.length} ->`, duplicates);
    
    process.exit(0);
}

testMatch().catch(console.error);

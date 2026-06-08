require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function test() {
    try {
        console.log("Connecting to MongoDB...", process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false });
        console.log("Connected successfully!");
        
        // Try a raw query just to see if we can read anything
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        console.log("Collections:", collections.map(c => c.name));
        
        const count = await db.collection('verveapplications').countDocuments();
        console.log("Applications count:", count);
        
        console.log("Done.");
        process.exit(0);
    } catch (e) {
        console.error("Error:", e);
        process.exit(1);
    }
}

test();

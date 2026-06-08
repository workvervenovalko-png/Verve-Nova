require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

// minimal mock models
const UserSchema = new mongoose.Schema({});
mongoose.model('User', UserSchema);

const AppSchema = new mongoose.Schema({ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }});
const VerveApp = mongoose.model('VerveApplication', AppSchema);

const Contact = mongoose.model('Contact', new mongoose.Schema({}));
const Blog = mongoose.model('Blog', new mongoose.Schema({}));

async function test() {
    try {
        console.log("Connecting...");
        await mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false });
        console.log("Connected.");
        
        console.time("VerveApplication");
        const apps = await VerveApp.find().populate({ path: 'userId', select: 'vn_id name email' }).sort({ createdAt: -1 }).lean();
        console.timeEnd("VerveApplication");
        console.log("Apps fetched:", apps.length);

        console.time("Contacts");
        const contacts = await Contact.find().sort({ createdAt: -1 }).lean();
        console.timeEnd("Contacts");
        console.log("Contacts fetched:", contacts.length);

        process.exit(0);
    } catch (e) {
        console.error("Error:", e);
        process.exit(1);
    }
}

test();

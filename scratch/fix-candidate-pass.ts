import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

async function fixCandidate() {
  try {
    console.log("Connecting to Database...");
    await mongoose.connect(MONGODB_URI!);
    
    const targetEmail = "puneetkushwaha9452@gmail.com";
    const password = "Puneet@28";
    const hashedPassword = await bcrypt.hash(password, 12);

    const User = mongoose.models.User || mongoose.model("User", new mongoose.Schema({
        email: String,
        password: { type: String, required: true },
        role: String
    }));

    const user = await User.findOne({ email: targetEmail });

    if (user) {
      console.log(`Found candidate account. Updating password to: ${password}`);
      await User.findByIdAndUpdate(user._id, { 
        password: hashedPassword,
        role: "CANDIDATE" 
      });
      console.log("Candidate account synced successfully.");
    } else {
      console.log("Account not found. Creating it as a candidate...");
      await User.create({
        name: "Puneet Kushwaha",
        email: targetEmail,
        password: hashedPassword,
        role: "CANDIDATE",
        vn_id: "VN-CAND-PUNEET"
      });
      console.log("Candidate account created successfully.");
    }

    process.exit(0);
  } catch (error) {
    console.error("Failure:", error);
    process.exit(1);
  }
}

fixCandidate();

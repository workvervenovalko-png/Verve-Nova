import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

async function checkAdmin() {
  try {
    console.log("Connecting to Verve Nova Database...");
    await mongoose.connect(MONGODB_URI!);
    
    const adminEmail = "work.vervenova.lko@gmail.com";
    const testPass = "Puneet@28";

    const User = mongoose.models.User || mongoose.model("User", new mongoose.Schema({
        email: String,
        password: { type: String, required: true },
        role: String
    }));

    const user = await User.findOne({ email: adminEmail });

    if (!user) {
      console.log(`ERROR: User ${adminEmail} not found in database.`);
      process.exit(1);
    }

    console.log(`User found. Role: ${user.role}`);
    console.log(`Stored Hash: ${user.password}`);

    const isValid = await bcrypt.compare(testPass, user.password);
    console.log(`Bcrypt Comparison (against "${testPass}"): ${isValid ? "SUCCESS" : "FAILED"}`);

    process.exit(0);
  } catch (error) {
    console.error("Check Failure:", error);
    process.exit(1);
  }
}

checkAdmin();

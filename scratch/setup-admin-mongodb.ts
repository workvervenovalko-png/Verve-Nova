import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI in .env.local");
  process.exit(1);
}

// User Schema Definition
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["CANDIDATE", "ADMIN"], default: "CANDIDATE" },
  vn_id: { type: String, unique: true },
  phone: String,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function runSetup() {
  try {
    console.log("Connecting to Verve Nova Database...");
    await mongoose.connect(MONGODB_URI);
    
    const adminEmail = "work.vervenova.lko@gmail.com";
    const adminPass = "Puneet@28";
    const adminVNID = "VN-ADMIN-001";
    const hashedPassword = await bcrypt.hash(adminPass, 12);

    console.log("Checking for account with Email or VN-ID...");
    
    // Check by VN-ID first to avoid duplicate key error
    let targetUser = await User.findOne({ vn_id: adminVNID });
    
    if (!targetUser) {
        // Try by email
        targetUser = await User.findOne({ email: adminEmail });
    }

    if (targetUser) {
      console.log(`Found existing account (${targetUser.email}). Migrating to new admin credentials...`);
      await User.findByIdAndUpdate(
        targetUser._id,
        {
          email: adminEmail,
          role: "ADMIN",
          password: hashedPassword,
          name: "Verve Admin (Puneet)",
          vn_id: adminVNID,
        }
      );
      console.log("Admin account updated and migrated successfully.");
    } else {
      console.log("Creating new mission-critical Admin account...");
      await User.create({
        name: "Verve Admin (Puneet)",
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
        vn_id: adminVNID,
      });
      console.log("Admin Account Initialized Successfully.");
    }

    console.log(`Final Admin Email: ${adminEmail}`);
    console.log(`Final Access Pass: ${adminPass}`);
    console.log(`Status: CLEARANCE_LEVEL_05_ACTIVE`);

    process.exit(0);
  } catch (error) {
    console.error("Setup Failure:", error);
    process.exit(1);
  }
}

runSetup();

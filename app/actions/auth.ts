"use server";

import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function registerUser(formData: {
  fullName: string;
  email: string;
  password: { val: string };
  phone: string;
}) {
  try {
    await dbConnect();

    // Check if user exists
    const existingUser = await User.findOne({ email: formData.email });
    if (existingUser) {
      return { success: false, error: "User already exists with this email." };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(formData.password.val, 12);

    // Generate VN-ID
    const year = new Date().getFullYear();
    const randomHex = Math.random().toString(16).substring(2, 6).toUpperCase();
    const vnID = `VN-${year}-${randomHex}`;

    // Create User
    const newUser = await User.create({
      name: formData.fullName,
      email: formData.email,
      password: hashedPassword,
      phone: formData.phone,
      vn_id: vnID,
      role: "CANDIDATE"
    });

    // Send Welcome Email
    try {
      const { resend } = await import("@/lib/resend");
      const { getWelcomeTemplate } = await import("@/lib/mail-templates");
      
      await resend.emails.send({
        from: 'Verve Nova <onboarding@vervenovatech.com>',
        to: formData.email,
        subject: 'ONBOARDING INITIALIZED // VERVE NOVA',
        html: getWelcomeTemplate(formData.fullName, vnID),
      });
    } catch (mailError) {
      console.error("Mail Error (Non-blocking):", mailError);
    }

    return { success: true, vn_id: vnID };
  } catch (error: any) {
    console.error("Registration Error:", error);
    return { success: false, error: error.message };
  }
}

export async function setupAdmin() {
  try {
    await dbConnect();
    const adminEmail = "work.vervenova.lko@gmail.com";
    const adminPass = "Puneet@28";

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
       // Update password and role just in case
       const hashedPassword = await bcrypt.hash(adminPass, 12);
       await User.findOneAndUpdate({ email: adminEmail }, { 
         role: "ADMIN", 
         password: hashedPassword,
         name: "Verve Admin (Puneet)"
       });
       return { success: true, message: "Admin updated." };
    }

    const hashedPassword = await bcrypt.hash(adminPass, 12);
    await User.create({
      name: "Verve Admin (Puneet)",
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
      vn_id: "VN-ADMIN-001"
    });

    return { success: true, message: "Admin created successfully." };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

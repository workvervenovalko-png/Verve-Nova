"use server";

import dbConnect from "@/lib/mongodb";
import VerveApplication from "@/models/Application";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function getUserProfile() {
  try {
    const session = await getServerSession(authOptions) as any;
    if (!session || !session.user) {
      return { success: false, error: "Authentication Required" };
    }

    await dbConnect();
    
    const [user, applications] = await Promise.all([
      User.findById(session.user.id).lean(),
      VerveApplication.find({ userId: session.user.id }).sort({ createdAt: -1 }).lean()
    ]);

    return { 
      success: true, 
      user: JSON.parse(JSON.stringify(user)),
      applications: JSON.parse(JSON.stringify(applications))
    };
  } catch (error: any) {
    console.error("Candidate Profile Error:", error);
    return { success: false, error: error.message };
  }
}

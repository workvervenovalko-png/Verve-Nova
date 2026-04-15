"use server";

import dbConnect from "@/lib/mongodb";
import VerveApplication from "@/models/Application";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function getDetailedAudit(applicationId: string) {
  try {
    const session = await getServerSession(authOptions) as any;
    if (!session) {
      return { success: false, error: "Authentication required." };
    }

    await dbConnect();

    // Fetch application with populated candidate user info
    const application = await VerveApplication.findById(applicationId)
      .populate({
        path: 'userId',
        select: 'vn_id name email'
      })
      .lean();

    if (!application) {
      return { success: false, error: "Audit record not found in central registry." };
    }

    // Security Clearance Check:
    // Only the owner of the application or an ADMIN can view the audit.
    const isOwner = application.userId._id.toString() === session.user.id;
    const isAdmin = session.user.role === 'ADMIN';

    if (!isOwner && !isAdmin) {
      return { success: false, error: "Access Denied. Insufficient clearance level." };
    }

    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(application)) 
    };
  } catch (error: any) {
    console.error("Audit Retrieval Error:", error);
    return { success: false, error: error.message };
  }
}

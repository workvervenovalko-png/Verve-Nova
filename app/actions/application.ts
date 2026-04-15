"use server";

import dbConnect from "@/lib/mongodb";
import VerveApplication from "@/models/Application";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function submitApplication(data: any) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return { success: false, error: "Authentication Required" };
    }

    await dbConnect();
    
    // Create detailed application
    const application = await VerveApplication.create({
      userId: session.user.id,
      roleSlug: data.roleSlug,
      personal: data.personal,
      education: data.education,
      experience: data.experience,
      projects: data.projects,
      skills: data.skills,
      links: data.links,
    });

    return { success: true, data: JSON.parse(JSON.stringify(application)) };
  } catch (error: any) {
    console.error("Application Error:", error);
    return { success: false, error: error.message };
  }
}

export async function getApplications() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return { success: false, error: "Unauthorized" };
    }

    await dbConnect();
    const apps = await VerveApplication.find()
      .populate('userId', 'vn_id full_name email')
      .sort({ createdAt: -1 });

    return { success: true, data: JSON.parse(JSON.stringify(apps)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getCandidateData() {
  try {
    const session = await getServerSession(authOptions);
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
      data: { 
        profile: JSON.parse(JSON.stringify(user)),
        applications: JSON.parse(JSON.stringify(applications))
      } 
    };
  } catch (error: any) {
    console.error("Candidate Data Error:", error);
    return { success: false, error: error.message };
  }
}


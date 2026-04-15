"use server";

import dbConnect from "@/lib/mongodb";
import VerveApplication from "@/models/Application";
import Contact from "@/models/Contact";
import User from "@/models/User";
import Blog from "@/models/Blog";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function getAdminData() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return { success: false, error: "Unauthorized access detected." };
    }

    console.log("Fetching Admin Data (VerveApplication)...");
    const [applications, leads] = await Promise.all([
      VerveApplication.find()
        .populate({
          path: 'userId',
          select: 'vn_id name email'
        })
        .sort({ createdAt: -1 })
        .lean(),
      Contact.find()
        .sort({ createdAt: -1 })
        .lean()
    ]);

    console.log("Fetch Complete. App Count:", applications.length);
    const blogs = await Blog.find().sort({ createdAt: -1 }).lean();

    return { 
      success: true, 
      data: { 
        applications: JSON.parse(JSON.stringify(applications)),
        leads: JSON.parse(JSON.stringify(leads)),
        blogs: JSON.parse(JSON.stringify(blogs))
      } 
    };
  } catch (error: any) {
    console.error("Admin Data Error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateApplicationStatus(appId: string, status: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return { success: false, error: "Unauthorized" };
    }

    await dbConnect();
    await VerveApplication.findByIdAndUpdate(appId, { status });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function scheduleInterview(appId: string, interviewDate?: string, interviewLink?: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return { success: false, error: "Unauthorized" };
    }

    await dbConnect();
    const update: any = { status: 'Interviewing' };
    if (interviewDate) update.interviewDate = new Date(interviewDate);
    if (interviewLink !== undefined) update.interviewLink = interviewLink;

    console.log("Scheduling Interview Update (VerveApplication):", { appId, update });
    const result = await VerveApplication.findByIdAndUpdate(appId, update, { new: true });
    console.log("Update Result:", result);
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createBlog(data: { title: string; excerpt: string; content: string; coverImage?: string }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return { success: false, error: "Unauthorized" };
    }

    await dbConnect();
    
    // Simple slug generation
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newBlog = new Blog({
      ...data,
      slug,
      createdAt: new Date(),
    });

    await newBlog.save();
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteBlog(blogId: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return { success: false, error: "Unauthorized" };
    }

    await dbConnect();
    await Blog.findByIdAndDelete(blogId);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getPublicBlogs() {
  try {
    await dbConnect();
    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(10).lean();
    return { success: true, data: JSON.parse(JSON.stringify(blogs)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    await dbConnect();
    const blog = await Blog.findOne({ slug }).lean();
    if (!blog) return { success: false, error: "Blog not found" };
    return { success: true, data: JSON.parse(JSON.stringify(blog)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

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
    const session = await getServerSession(authOptions) as any;
    if (!session || session.user?.role !== 'ADMIN') {
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
    const session = await getServerSession(authOptions) as any;
    if (!session || session.user?.role !== 'ADMIN') {
      return { success: false, error: "Unauthorized" };
    }

    await dbConnect();
    const app = await VerveApplication.findByIdAndUpdate(appId, { status }, { new: true }).populate('userId', 'name email');
    
    // Send Status Update Email (Accepted/Rejected)
    if (app && (status === 'Accepted' || status === 'Rejected')) {
      const targetEmail = (app.userId as any).email;
      console.log(`>>> [MAIL_SYSTEM] Preparing status update for: ${targetEmail} (Status: ${status})`);
      
      try {
        const { resend } = await import("@/lib/resend");
        const { getStatusTemplate } = await import("@/lib/mail-templates");
        
        const mailRes = await resend.emails.send({
          from: 'Verve Nova Tech <careers@vervenovatech.com>',
          to: targetEmail,
          subject: `APPLICATION ${status.toUpperCase()} // VERVE NOVA`,
          html: getStatusTemplate((app.userId as any).name, status),
        });

        console.log(`>>> [MAIL_SYSTEM] Status email sent. Response ID:`, mailRes.data?.id);
      } catch (mailError: any) {
        console.error(">>> [MAIL_SYSTEM] CRITICAL ERROR sending status email:", mailError.message);
      }
    }

    return { success: true };
  } catch (error: any) {
    console.error("Admin Status Update Error:", error);
    return { success: false, error: error.message };
  }
}

export async function scheduleInterview(appId: string, interviewDate?: string, interviewLink?: string, triggerEmail: boolean = false) {
  try {
    const session = await getServerSession(authOptions) as any;
    if (!session || session.user?.role !== 'ADMIN') {
      return { success: false, error: "Unauthorized" };
    }

    await dbConnect();
    const update: any = { status: 'Interviewing' };
    if (interviewDate) update.interviewDate = new Date(interviewDate);
    if (interviewLink !== undefined) update.interviewLink = interviewLink;

    console.log(">>> [ADMIN_SYSTEM] Updating Interview Details:", { appId, update, triggerEmail });
    const app = await VerveApplication.findByIdAndUpdate(appId, update, { new: true }).populate('userId', 'name email');
    
    // Send Interview Email ONLY if explicitly triggered
    if (triggerEmail && app && interviewDate) {
      const targetEmail = (app.userId as any).email;
      console.log(`>>> [MAIL_SYSTEM] Manual trigger received. Initiating interview protocol for: ${targetEmail}`);

      try {
        const { resend } = await import("@/lib/resend");
        const { getInterviewTemplate } = await import("@/lib/mail-templates");
        
        const mailRes = await resend.emails.send({
          from: 'Verve Nova Tech <careers@vervenovatech.com>',
          to: targetEmail,
          subject: 'INTERVIEW PROTOCOL INITIALIZED // VERVE NOVA',
          html: getInterviewTemplate((app.userId as any).name, new Date(interviewDate).toLocaleString(), interviewLink),
        });

        console.log(`>>> [MAIL_SYSTEM] Interview mail dispatched. Response ID:`, mailRes.data?.id);
      } catch (mailError: any) {
        console.error(">>> [MAIL_SYSTEM] CRITICAL ERROR sending interview mail:", mailError.message);
      }
    } else if (triggerEmail) {
        console.log(">>> [MAIL_SYSTEM] Email skipped despite trigger: App or InterviewDate missing", { hasApp: !!app, hasDate: !!interviewDate });
    } else {
        console.log(">>> [MAIL_SYSTEM] Background update complete. Email pending manual trigger.");
    }

    return { success: true };
  } catch (error: any) {
    console.error("Admin Interview Update Error:", error);
    return { success: false, error: error.message };
  }
}

export async function createBlog(data: { title: string; excerpt: string; content: string; coverImage?: string }) {
  try {
    const session = await getServerSession(authOptions) as any;
    if (!session || session.user?.role !== 'ADMIN') {
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
    const session = await getServerSession(authOptions) as any;
    if (!session || session.user?.role !== 'ADMIN') {
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

export async function searchCandidateByVnId(vnId: string) {
  try {
    const session = await getServerSession(authOptions) as any;
    if (!session || session.user?.role !== 'ADMIN') {
      return { success: false, error: "Unauthorized" };
    }

    await dbConnect();
    // Assuming vn_id is typically uppercase, but we can make it case-insensitive if needed. Let's do exact match first as it's generated by us.
    const user = await User.findOne({ vn_id: vnId.trim() }).select('name email vn_id role').lean();
    
    if (!user) {
      return { success: false, error: "No candidate found with this VN-ID." };
    }

    return { success: true, data: JSON.parse(JSON.stringify(user)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function issueDocument(formData: FormData) {
  try {
    const session = await getServerSession(authOptions) as any;
    if (!session || session.user?.role !== 'ADMIN') {
      return { success: false, error: "Unauthorized" };
    }

    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const docType = formData.get('docType') as string; // 'offer_letter' or 'certificate'
    const file = formData.get('file') as File;

    if (!email || !name || !docType || !file) {
      return { success: false, error: "Missing required fields." };
    }

    // Convert File to Buffer for Resend
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { resend } = await import("@/lib/resend");
    const { getOfferLetterTemplate, getCertificateTemplate } = await import("@/lib/mail-templates");

    console.log(`>>> [MAIL_SYSTEM] Attempting to dispatch ${docType} to ${email}`);

    let htmlContent = "";
    let subject = "";

    if (docType === "offer_letter") {
      htmlContent = getOfferLetterTemplate(name);
      subject = "OFFICIAL OFFER OF EMPLOYMENT // VERVE NOVA";
    } else if (docType === "certificate") {
      htmlContent = getCertificateTemplate(name);
      subject = "CERTIFICATE OF COMPLETION // VERVE NOVA";
    } else {
      return { success: false, error: "Invalid document type." };
    }

    const mailRes = await resend.emails.send({
      from: 'Verve Nova Tech <onboarding@vervenovatech.com>', // Using onboarding identity
      to: email,
      subject: subject,
      html: htmlContent,
      attachments: [
        {
          filename: file.name,
          content: buffer,
        }
      ]
    });

    console.log(`>>> [MAIL_SYSTEM] Document dispatched. Response ID:`, mailRes.data?.id);

    return { success: true };
  } catch (error: any) {
    console.error(">>> [MAIL_SYSTEM] CRITICAL ERROR in issueDocument:", error);
    return { success: false, error: error.message || "Failed to process document issuance." };
  }
}

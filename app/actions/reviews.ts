"use server";

import dbConnect from "@/lib/mongodb";
import Review from "@/models/Review";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

// 1. Admin generates a unique client review request link
export async function createReviewLink(data: {
  projectName: string;
  projectGoal?: string;
  clientName?: string;
  clientPhone?: string;
  clientEmail?: string;
}) {
  try {
    const session = (await getServerSession(authOptions)) as any;
    if (!session || session.user?.role?.toUpperCase() !== "ADMIN") {
      return { success: false, error: "Unauthorized. Admin session required." };
    }

    if (!data.projectName?.trim()) {
      return { success: false, error: "Project name is required." };
    }

    await dbConnect();

    // Generate secure random token
    const token = crypto.randomBytes(16).toString("hex");

    const newReview = await Review.create({
      projectName: data.projectName.trim(),
      projectGoal: data.projectGoal?.trim() || "",
      clientName: data.clientName?.trim() || "",
      clientPhone: data.clientPhone?.trim() || "",
      clientEmail: data.clientEmail?.trim() || "",
      token,
      status: "pending",
      isPublished: false,
    });

    revalidatePath("/admin");

    return {
      success: true,
      token,
      reviewId: newReview._id.toString(),
      message: "Review link generated successfully.",
    };
  } catch (error: any) {
    console.error("Error creating review link:", error);
    return { success: false, error: error.message || "Failed to create review link." };
  }
}

// Permanent Project Presets for open, reusable review links
const PROJECT_PRESETS: Record<string, {
  slug: string;
  projectName: string;
  projectGoal: string;
  websiteUrl?: string;
}> = {
  "servicehub": {
    slug: "servicehub",
    projectName: "ServiceHub",
    projectGoal: "On-Demand Service Booking & Handyman App Ecosystem",
    websiteUrl: "https://play.google.com/store/apps/details?id=com.sahil.servicehub",
  },
  "service-hub": {
    slug: "servicehub",
    projectName: "ServiceHub",
    projectGoal: "On-Demand Service Booking & Handyman App Ecosystem",
    websiteUrl: "https://play.google.com/store/apps/details?id=com.sahil.servicehub",
  },
  "chotu": {
    slug: "chotu",
    projectName: "ChotU (छोटू)",
    projectGoal: "Hyperlocal Quick Commerce & Instant Grocery Delivery App",
    websiteUrl: "https://vervenovatech.com/case-studies",
  },
  "siora": {
    slug: "siora",
    projectName: "Siora Infra Design",
    projectGoal: "3D Architecture Portfolio & Interactive Construction CMS",
    websiteUrl: "https://siorainfradesign.com/",
  },
  "siora-infra": {
    slug: "siora",
    projectName: "Siora Infra Design",
    projectGoal: "3D Architecture Portfolio & Interactive Construction CMS",
    websiteUrl: "https://siorainfradesign.com/",
  },
  "billzer": {
    slug: "billzer",
    projectName: "VNT Billzer",
    projectGoal: "Flagship Retail POS, Inventory & SaaS Billing Suite",
    websiteUrl: "https://verve-ledger.vercel.app/",
  },
  "vnt-billzer": {
    slug: "billzer",
    projectName: "VNT Billzer",
    projectGoal: "Flagship Retail POS, Inventory & SaaS Billing Suite",
    websiteUrl: "https://verve-ledger.vercel.app/",
  },
  "crm": {
    slug: "crm",
    projectName: "Verve CRM",
    projectGoal: "Intelligent Client Relationship & Sales Automation Engine",
    websiteUrl: "https://www.vervenovatechcrm.online/login",
  },
  "verve-crm": {
    slug: "crm",
    projectName: "Verve CRM",
    projectGoal: "Intelligent Client Relationship & Sales Automation Engine",
    websiteUrl: "https://www.vervenovatechcrm.online/login",
  },
  "transcription": {
    slug: "transcription",
    projectName: "Advance Transcription",
    projectGoal: "AI Speech-to-Text Transcription & Audio Intelligence Platform",
    websiteUrl: "https://www.advancetranscription.com/",
  },
  "advance-transcription": {
    slug: "transcription",
    projectName: "Advance Transcription",
    projectGoal: "AI Speech-to-Text Transcription & Audio Intelligence Platform",
    websiteUrl: "https://www.advancetranscription.com/",
  },
  "general": {
    slug: "general",
    projectName: "Custom Engineering Project",
    projectGoal: "Full-Stack Web / Mobile Application & Engineering Engagement",
    websiteUrl: "",
  },
  "custom": {
    slug: "general",
    projectName: "Custom Engineering Project",
    projectGoal: "Full-Stack Web / Mobile Application & Engineering Engagement",
    websiteUrl: "",
  },
};

// 2. Fetch review request details for the client form
export async function getReviewByToken(token: string) {
  try {
    const cleanToken = (token || "").toLowerCase().trim();

    // Check if token matches a permanent project slug
    if (PROJECT_PRESETS[cleanToken]) {
      const preset = PROJECT_PRESETS[cleanToken];
      return {
        success: true,
        review: {
          id: `preset-${cleanToken}`,
          projectName: preset.projectName,
          projectGoal: preset.projectGoal || "",
          problemStatement: "",
          websiteUrl: preset.websiteUrl || "",
          serviceExperience: "",
          clientName: "",
          clientRole: "",
          clientCompany: "",
          clientLinkedIn: "",
          highlights: ["On-Time Milestone Delivery", "Clean Code & Modern Architecture"],
          wouldRecommend: true,
          rating: 5,
          reviewText: "",
          status: "pending", // Always open and fresh for incoming client reviews
        },
      };
    }

    await dbConnect();
    const review = await Review.findOne({ token }).lean();

    if (!review) {
      return { success: false, error: "Invalid or expired review link." };
    }

    return {
      success: true,
      review: {
        id: (review as any)._id.toString(),
        projectName: review.projectName,
        projectGoal: review.projectGoal || "",
        problemStatement: review.problemStatement || "",
        websiteUrl: review.websiteUrl || "",
        serviceExperience: review.serviceExperience || "",
        clientName: review.clientName || "",
        clientRole: review.clientRole || "",
        clientCompany: review.clientCompany || "",
        clientLinkedIn: review.clientLinkedIn || "",
        highlights: review.highlights || [],
        wouldRecommend: review.wouldRecommend ?? true,
        rating: review.rating || 5,
        reviewText: review.reviewText || "",
        status: review.status,
      },
    };
  } catch (error: any) {
    console.error("Error fetching review by token:", error);
    return { success: false, error: error.message || "Failed to fetch review." };
  }
}

// 3. Client submits their review (Automatically Published)
export async function submitClientReview(token: string, data: {
  projectName?: string;
  clientName: string;
  clientRole: string;
  clientCompany?: string;
  clientLinkedIn?: string;
  projectGoal?: string;
  problemStatement?: string;
  websiteUrl?: string;
  serviceExperience?: string;
  reviewText: string;
  rating: number;
  highlights?: string[];
  wouldRecommend?: boolean;
}) {
  try {
    if (!token) {
      return { success: false, error: "Missing review link token." };
    }
    if (!data.clientName?.trim()) {
      return { success: false, error: "Your name is required." };
    }
    if (!data.clientRole?.trim()) {
      return { success: false, error: "Your designation or role is required." };
    }
    if (!data.reviewText?.trim() && !data.serviceExperience?.trim()) {
      return { success: false, error: "Please enter your review message or feedback." };
    }

    await dbConnect();
    const cleanToken = (token || "").toLowerCase().trim();

    // If submitted via permanent project preset link, create a new verified review document
    if (PROJECT_PRESETS[cleanToken]) {
      const preset = PROJECT_PRESETS[cleanToken];
      const assignedProjectName =
        (cleanToken === "general" || cleanToken === "custom") && data.projectName?.trim()
          ? data.projectName.trim()
          : preset.projectName;

      const newReview = await Review.create({
        projectName: assignedProjectName,
        projectGoal: data.projectGoal?.trim() || preset.projectGoal || "",
        problemStatement: data.problemStatement?.trim() || "",
        websiteUrl: data.websiteUrl?.trim() || preset.websiteUrl || "",
        serviceExperience: data.serviceExperience?.trim() || "",
        reviewText: (data.reviewText || data.serviceExperience || "").trim(),
        rating: Math.min(5, Math.max(1, Number(data.rating) || 5)),
        clientName: data.clientName.trim(),
        clientRole: data.clientRole.trim(),
        clientCompany: data.clientCompany?.trim() || "",
        clientLinkedIn: data.clientLinkedIn?.trim() || "",
        highlights: Array.isArray(data.highlights) ? data.highlights : [],
        wouldRecommend: data.wouldRecommend !== false,
        token: crypto.randomBytes(16).toString("hex"),
        status: "published",     // AUTOMATICALLY PUBLISHED!
        isPublished: true,       // AUTOMATICALLY PUBLISHED!
        createdAt: new Date(),
        submittedAt: new Date(),
      });

      revalidatePath("/admin");
      revalidatePath("/testimonials");
      revalidatePath("/");

      return {
        success: true,
        message: "Review submitted and published successfully! Thank you for trusting Verve Nova Technologies.",
        reviewId: newReview._id.toString(),
      };
    }

    // Individual invitation token flow
    const review = await Review.findOne({ token });
    if (!review) {
      return { success: false, error: "Review invitation not found." };
    }

    review.clientName = data.clientName.trim();
    review.clientRole = data.clientRole.trim();
    review.clientCompany = data.clientCompany?.trim() || "";
    review.clientLinkedIn = data.clientLinkedIn?.trim() || "";
    review.projectGoal = data.projectGoal?.trim() || review.projectGoal || "";
    review.problemStatement = data.problemStatement?.trim() || "";
    review.websiteUrl = data.websiteUrl?.trim() || "";
    review.serviceExperience = data.serviceExperience?.trim() || "";
    review.reviewText = (data.reviewText || data.serviceExperience || "").trim();
    review.rating = Math.min(5, Math.max(1, Number(data.rating) || 5));
    review.highlights = Array.isArray(data.highlights) ? data.highlights : [];
    review.wouldRecommend = data.wouldRecommend !== false;
    review.status = "published"; // AUTOMATICALLY PUBLISHED!
    review.isPublished = true;   // AUTOMATICALLY PUBLISHED!
    review.submittedAt = new Date();

    await review.save();

    revalidatePath("/admin");
    revalidatePath("/testimonials");
    revalidatePath("/");

    return {
      success: true,
      message: "Review submitted and published successfully! Thank you for trusting Verve Nova Technologies.",
      reviewId: review._id.toString(),
    };
  } catch (error: any) {
    console.error("Error submitting client review:", error);
    return { success: false, error: error.message || "Failed to submit review." };
  }
}

// 4. Admin fetches all reviews
export async function getAdminReviews() {
  try {
    const session = (await getServerSession(authOptions)) as any;
    if (!session || session.user?.role?.toUpperCase() !== "ADMIN") {
      return { success: false, error: "Unauthorized access." };
    }

    await dbConnect();
    const reviews = await Review.find().sort({ createdAt: -1 }).lean();

    return {
      success: true,
      reviews: reviews.map((r: any) => ({
        id: r._id.toString(),
        projectName: r.projectName,
        projectGoal: r.projectGoal || "",
        problemStatement: r.problemStatement || "",
        websiteUrl: r.websiteUrl || "",
        serviceExperience: r.serviceExperience || "",
        clientName: r.clientName || "",
        clientRole: r.clientRole || "",
        clientCompany: r.clientCompany || "",
        clientLinkedIn: r.clientLinkedIn || "",
        clientEmail: r.clientEmail || "",
        clientPhone: r.clientPhone || "",
        rating: r.rating || 5,
        reviewText: r.reviewText || "",
        highlights: r.highlights || [],
        wouldRecommend: r.wouldRecommend ?? true,
        token: r.token,
        status: r.status,
        isPublished: !!r.isPublished,
        createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : null,
        submittedAt: r.submittedAt ? new Date(r.submittedAt).toISOString() : null,
      })),
    };
  } catch (error: any) {
    console.error("Error fetching admin reviews:", error);
    return { success: false, error: error.message || "Failed to fetch reviews." };
  }
}

// 5. Admin toggles review publish status
export async function togglePublishReview(reviewId: string, isPublished: boolean) {
  try {
    const session = (await getServerSession(authOptions)) as any;
    if (!session || session.user?.role?.toUpperCase() !== "ADMIN") {
      return { success: false, error: "Unauthorized." };
    }

    await dbConnect();
    const review = await Review.findById(reviewId);
    if (!review) {
      return { success: false, error: "Review not found." };
    }

    review.isPublished = isPublished;
    if (isPublished) {
      review.status = "published";
    } else if (review.status === "published") {
      review.status = "submitted";
    }

    await review.save();

    revalidatePath("/admin");
    revalidatePath("/testimonials");
    revalidatePath("/");

    return { success: true, message: `Review ${isPublished ? "published" : "unpublished"} successfully.` };
  } catch (error: any) {
    console.error("Error toggling review status:", error);
    return { success: false, error: error.message || "Failed to update review status." };
  }
}

// 6. Admin deletes a review
export async function deleteReview(reviewId: string) {
  try {
    const session = (await getServerSession(authOptions)) as any;
    if (!session || session.user?.role?.toUpperCase() !== "ADMIN") {
      return { success: false, error: "Unauthorized." };
    }

    await dbConnect();
    await Review.findByIdAndDelete(reviewId);

    revalidatePath("/admin");
    revalidatePath("/testimonials");
    revalidatePath("/");

    return { success: true, message: "Review deleted successfully." };
  } catch (error: any) {
    console.error("Error deleting review:", error);
    return { success: false, error: error.message || "Failed to delete review." };
  }
}

// 7. Public: Fetch published reviews for live website
export async function getPublishedReviews() {
  try {
    await dbConnect();
    const reviews = await Review.find({ isPublished: true, status: { $in: ["submitted", "published"] } })
      .sort({ submittedAt: -1 })
      .lean();

    return {
      success: true,
      reviews: reviews.map((r: any) => ({
        id: r._id.toString(),
        name: r.clientName || "Verified Client",
        role: r.clientRole || "Client",
        company: r.clientCompany || "",
        projectName: r.projectName,
        projectGoal: r.projectGoal || "",
        problemStatement: r.problemStatement || "",
        websiteUrl: r.websiteUrl || "",
        serviceExperience: r.serviceExperience || "",
        text: r.reviewText || r.serviceExperience || "",
        stars: r.rating || 5,
        highlights: r.highlights || [],
        linkedIn: r.clientLinkedIn || "",
        submittedAt: r.submittedAt ? new Date(r.submittedAt).toISOString() : null,
      })),
    };
  } catch (error: any) {
    console.error("Error fetching published reviews:", error);
    return { success: false, reviews: [] };
  }
}

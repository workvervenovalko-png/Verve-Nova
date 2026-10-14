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

// 2. Fetch review request details for the client form
export async function getReviewByToken(token: string) {
  try {
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

// 3. Client submits their review
export async function submitClientReview(token: string, data: {
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
      return { success: false, error: "Missing review token." };
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
    review.status = "submitted";
    review.submittedAt = new Date();

    await review.save();

    revalidatePath("/admin");
    revalidatePath("/testimonials");
    revalidatePath("/");

    return { success: true, message: "Review submitted successfully! Thank you for trusting Verve Nova Technologies." };
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

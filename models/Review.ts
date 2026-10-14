import mongoose, { Schema, model, models } from 'mongoose';

export interface IReview {
  _id?: string;
  projectName: string;
  projectGoal?: string; // Wo kya karwane aaye the (e.g. Mobile App, Custom ERP, AI Workflow, etc.)
  problemStatement?: string; // Unki problem kya thi (Core challenge faced before Verve Nova)
  websiteUrl?: string; // Website / Live App link
  serviceExperience?: string; // Verve Nova Tech ki service kaisi lagi
  reviewText?: string; // Detailed message / feedback
  rating: number; // 1 to 5 stars
  clientName?: string;
  clientRole?: string;
  clientCompany?: string;
  clientLinkedIn?: string;
  clientEmail?: string;
  clientPhone?: string;
  highlights?: string[]; // e.g. ["On-Time Delivery", "Code Quality", "Communication"]
  wouldRecommend?: boolean;
  token: string;
  status: 'pending' | 'submitted' | 'published';
  isPublished: boolean;
  createdAt: Date;
  submittedAt?: Date;
}

const ReviewSchema = new Schema<IReview>({
  projectName: { type: String, required: true },
  projectGoal: { type: String, default: "" },
  problemStatement: { type: String, default: "" },
  websiteUrl: { type: String, default: "" },
  serviceExperience: { type: String, default: "" },
  reviewText: { type: String, default: "" },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  clientName: { type: String, default: "" },
  clientRole: { type: String, default: "" },
  clientCompany: { type: String, default: "" },
  clientLinkedIn: { type: String, default: "" },
  clientEmail: { type: String, default: "" },
  clientPhone: { type: String, default: "" },
  highlights: { type: [String], default: [] },
  wouldRecommend: { type: Boolean, default: true },
  token: { type: String, required: true, unique: true },
  status: { 
    type: String, 
    enum: ['pending', 'submitted', 'published'], 
    default: 'pending' 
  },
  isPublished: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  submittedAt: { type: Date },
});

const Review = models.Review || model<IReview>('Review', ReviewSchema);

export default Review;

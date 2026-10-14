export interface Testimonial {
  id?: string;
  name: string;
  role: string;
  company?: string;
  projectName?: string;
  projectGoal?: string;
  problemStatement?: string;
  serviceExperience?: string;
  websiteUrl?: string;
  text: string;
  stars: number;
  highlights?: string[];
  verificationBadge?: string;
  verificationUrl?: string;
  projectUrl?: string;
  submittedAt?: string | null;
}

// Zero-fake-review policy: reviews are dynamically populated exclusively from real client link submissions
export const testimonials: Testimonial[] = [];

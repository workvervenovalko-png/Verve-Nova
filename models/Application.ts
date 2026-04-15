import mongoose, { Schema, model, models } from 'mongoose';

const ApplicationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  roleSlug: { type: String, required: true },
  
  // High-Fidelity Personal Data
  personal: {
    fullName: String,
    email: String,
    phone: String,
    dob: String,
    gender: String,
    currentCity: String
  },

  // Academic Matrix
  education: {
    college: String,
    degree: String,
    branch: String,
    graduationYear: String,
    cgpa: String,
    tenthPercentage: String,
    twelfthPercentage: String
  },

  // Professional Stack
  experience: [{
    company: String,
    role: String,
    duration: String,
    description: String
  }],
  
  projects: [{
    name: String,
    techStack: String,
    description: String,
    link: String
  }],

  skills: [String],

  // Terminal Assets
  links: {
    resumeUrl: String,
    portfolio: String,
    linkedIn: String,
    github: String
  },

  status: { 
    type: String, 
    enum: ['Reviewing', 'Interviewing', 'Accepted', 'Rejected'], 
    default: 'Reviewing' 
  },
  interviewDate: { type: Date },
  interviewLink: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const VerveApplication = models.VerveApplication || model('VerveApplication', ApplicationSchema);

export default VerveApplication;

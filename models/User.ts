import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  phone: { type: String },
  image: { type: String },
  emailVerified: { type: Date },
  vn_id: { type: String, unique: true },
  role: { type: String, enum: ['CANDIDATE', 'ADMIN'], default: 'CANDIDATE' },
  createdAt: { type: Date, default: Date.now }
});

const User = models.User || model('User', UserSchema);

export default User;

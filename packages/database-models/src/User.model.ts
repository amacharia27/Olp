// packages/database-models/src/User.model.ts

import { Schema, model, Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserRole } from '@olp-monitor/shared-types';

export interface IUserDocument extends Document {
  userNumber: string;
  firstName: string;
  lastName: string;
  username?: string;
  email: string;
  password?: string; // It's optional as we won't return it in every query
  role: UserRole;
  schoolId?: Types.ObjectId;
  isActive: boolean;
  googleId?: string;
  avatar?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUserDocument>(
  {
    userNumber: { type: String, required: true, unique: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    username: {
      type: String,
      unique: true,
      sparse: true, // IMPORTANT: Ensures uniqueness only for documents that have this field.
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      sparse: true, // IMPORTANT: Allows multiple users (students) to not have an email.
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: false, select: false },
    googleId: { type: String, unique: true, sparse: true },
    avatar: { type: String },
    role: { type: String, enum: Object.values(UserRole), required: true },
    schoolId: { type: Schema.Types.ObjectId, ref: 'School', index: true, sparse: true },
    isActive: { type: Boolean, default: true },
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
  },
  { timestamps: true }
);

// The rest of the file (pre-save hooks, methods) remains the same.

// Pre-save hook to hash password
UserSchema.pre<IUserDocument>('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password
UserSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = model<IUserDocument>('User', UserSchema);
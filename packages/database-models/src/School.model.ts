// packages/database-models/src/School.model.ts

import { Schema, model, Document } from 'mongoose';

export enum SubscriptionStatus {
  ACTIVE = 'Active',
  IN_GRACE_PERIOD = 'InGracePeriod',
  SUSPENDED = 'Suspended',
  INACTIVE = 'Inactive',
}

export interface ISchoolDocument extends Document {
  name: string;
  schoolCode: string;
  address: string;
  billingContact: {
    name: string;
    email: string;
    phone: string;
  };
  subscriptionStatus: SubscriptionStatus;
  subscriptionExpiresAt?: Date; // CHANGED name for clarity
  activeStudentCount: number; // ADDED
}

const SchoolSchema = new Schema<ISchoolDocument>(
  {
    name: { type: String, required: true, trim: true },
    schoolCode: { type: String, required: true, unique: true, trim: true },
    address: { type: String, required: true },
    billingContact: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    subscriptionStatus: {
      type: String,
      enum: Object.values(SubscriptionStatus),
      default: SubscriptionStatus.INACTIVE,
    },
    subscriptionExpiresAt: { type: Date }, // CHANGED name for clarity
    activeStudentCount: { type: Number, default: 0 }, // ADDED
  },
  { timestamps: true }
);

export const School = model<ISchoolDocument>('School', SchoolSchema);
import { Schema, model, Document, Types } from 'mongoose';

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum PaymentMethod {
  MPESA = 'M-Pesa',
  CARD = 'Card',
  BANK_TRANSFER = 'Bank Transfer',
  OTHER = 'Other',
}

export interface IPaymentHistory extends Document {
  school: Types.ObjectId;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  transactionId: string;
  status: PaymentStatus;
  description?: string;
  receiptNumber?: string;
  paymentDate: Date;
  dueDate: Date;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentHistorySchema = new Schema<IPaymentHistory>(
  {
    school: {
      type: Schema.Types.ObjectId,
      ref: 'School',
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'KES',
      uppercase: true,
      length: 3,
    },
    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethod),
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },
    description: {
      type: String,
      trim: true,
    },
    receiptNumber: {
      type: String,
      trim: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for common queries
PaymentHistorySchema.index({ school: 1, status: 1 });
PaymentHistorySchema.index({ paymentDate: -1 });
PaymentHistorySchema.index({ dueDate: 1 });

// Virtual for formatted amount
PaymentHistorySchema.virtual('formattedAmount').get(function (this: IPaymentHistory) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: this.currency,
  }).format(this.amount);
});

// Virtual for payment status with color
PaymentHistorySchema.virtual('statusColor').get(function (this: IPaymentHistory) {
  switch (this.status) {
    case PaymentStatus.COMPLETED:
      return 'success';
    case PaymentStatus.PENDING:
      return 'warning';
    case PaymentStatus.FAILED:
      return 'error';
    case PaymentStatus.REFUNDED:
      return 'info';
    default:
      return 'default';
  }
});

export const PaymentHistory = model<IPaymentHistory>('PaymentHistory', PaymentHistorySchema);

export type PaymentHistoryDocument = IPaymentHistory & { _id: Types.ObjectId };

import { Schema, model, Document, Types } from 'mongoose';

export interface Report extends Document {
  type: 'ad' | 'user' | 'store' | 'tender';
  targetId: Types.ObjectId;
  authorId: Types.ObjectId;
  details: string;
  moderatorId?: Types.ObjectId;
  resolution?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReportSchema = new Schema<Report>(
  {
    type: { type: String, enum: ['ad', 'user', 'store', 'tender'], required: true },
    targetId: { type: Types.ObjectId, required: true },
    authorId: { type: Types.ObjectId, ref: 'User', required: true },
    details: { type: String, required: true },
    moderatorId: { type: Types.ObjectId, ref: 'User' },
    resolution: String,
  },
  { timestamps: true }
);

ReportSchema.index({ type: 1, targetId: 1 });
ReportSchema.index({ moderatorId: 1 });

export const ReportModel = model<Report>('Report', ReportSchema);

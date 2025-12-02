import { Schema, model, Document } from 'mongoose';

export interface Report extends Document {
  reporter: Schema.Types.ObjectId;
  target: Schema.Types.ObjectId;
  reason: string;
  details?: string;
  createdAt: Date;
}

const ReportSchema = new Schema<Report>({
  reporter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  target: { type: Schema.Types.ObjectId, refPath: 'onModel', required: true },
  reason: { type: String, required: true },
  details: String,
  onModel: { type: String, enum: ['User', 'Ad', 'Tender'], required: true },
}, { timestamps: { createdAt: true, updatedAt: false } });

ReportSchema.index({ target: 1, onModel: 1 });

export const ReportModel = model<Report>('Report', ReportSchema);

import { Schema, model, Document, Model } from "mongoose";

export type ReportTargetType =
  | "ad"
  | "user"
  | "store"
  | "tender";

export type ReportStatus =
  | "open"
  | "inReview"
  | "resolved";

export interface Report extends Document {
  type: string;
  targetType: ReportTargetType;
  targetId: string;
  authorId: string;
  details?: string;
  moderatorId?: string;
  status: ReportStatus;
  resolution?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReportSchema = new Schema<Report>(
  {
    type: { type: String, required: true },
    targetType: {
      type: String,
      enum: ["ad", "user", "store", "tender"],
      required: true,
      index: true,
    },
    targetId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    details: String,

    moderatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
      sparse: true,
    },

    status: {
      type: String,
      enum: ["open", "inReview", "resolved"],
      default: "open",
      index: true,
    },

    resolution: String,
  },
  { timestamps: true }
);

ReportSchema.index({ status: 1, createdAt: -1 });

export const ReportModel: Model<Report> = model<Report>(
  "Report",
  ReportSchema
);


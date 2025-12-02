export type ModerationStatus = "pending" | "approved" | "rejected";

export interface ModerationInfo {
  status: ModerationStatus;
  reason?: string;
  moderatorId?: string;
  updatedAt?: Date;
}


export type ModerationStatus = 'pending' | 'approved' | 'rejected';

export interface ModerationMeta {
  status: ModerationStatus;
  reason?: string;
  updatedAt?: Date;
}

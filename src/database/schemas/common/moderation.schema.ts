import { ModerationMeta, ModerationStatus } from '../../types/moderation.types';

export const createModeration = (
  status: ModerationStatus = 'pending',
  reason?: string,
): ModerationMeta => ({
  status,
  reason,
  updatedAt: new Date(),
});

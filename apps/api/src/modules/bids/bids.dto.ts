import { z } from 'zod';
import { BidCurrency, BidStatus } from './bids.types';

export const createBidSchema = z.object({
  tenderId: z.string(),
  price: z.number(),
  currency: z.enum(['BYN', 'RUB', 'PLN', 'EUR'] satisfies readonly BidCurrency[]),
  estimatedDurationDays: z.number().min(1),
  canStartFrom: z.string().datetime(),
  comment: z.string().optional(),
  includesMaterials: z.boolean(),
  warrantyMonths: z.number().nullable().optional(),
});

export type CreateBidDto = z.infer<typeof createBidSchema>;

export const updateBidSchema = createBidSchema.partial();
export type UpdateBidDto = z.infer<typeof updateBidSchema>;

export const bidsFilterSchema = z.object({
  status: z.enum(['sent', 'viewed', 'shortlisted', 'rejected', 'accepted']).optional(),
});

export type BidListFilters = {
  status?: BidStatus;
};

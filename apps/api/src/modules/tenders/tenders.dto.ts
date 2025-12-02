import { z } from 'zod';
import { TenderCurrency, TenderListFilters, TenderStatus } from './tenders.types';

export const createTenderSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.string().min(2),
  budgetMin: z.number().optional(),
  budgetMax: z.number().optional(),
  currency: z.enum(['BYN', 'RUB', 'PLN', 'EUR'] satisfies readonly TenderCurrency[]),
  addressText: z.string(),
  lat: z.number(),
  lng: z.number(),
  deadlinePreferred: z.string().datetime().optional(),
  photos: z.array(z.string()).optional(),
  publishNow: z.boolean().optional(),
  city: z.string().default(''),
  country: z.enum(['BY', 'RU', 'PL']),
});

export type CreateTenderDto = z.infer<typeof createTenderSchema>;

export const updateTenderSchema = createTenderSchema.partial().extend({
  status: z.enum(['draft', 'published']).optional(),
});

export type UpdateTenderDto = z.infer<typeof updateTenderSchema>;

export const listTendersQuerySchema = z.object({
  status: z.enum(['draft', 'published', 'in_progress', 'completed', 'cancelled', 'expired']).optional(),
  city: z.string().optional(),
  country: z.enum(['BY', 'RU', 'PL']).optional(),
  category: z.string().optional(),
  radiusKm: z.coerce.number().optional(),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  offset: z.coerce.number().optional(),
});

export type ListTendersQueryDto = TenderListFilters;

export const publishTenderSchema = z.object({
  publishNow: z.boolean().optional(),
});

export const customerContextSchema = z.object({
  userId: z.string(),
});

export type CustomerContext = z.infer<typeof customerContextSchema>;

export const tenderStatusValues: TenderStatus[] = [
  'draft',
  'published',
  'in_progress',
  'completed',
  'cancelled',
  'expired',
];

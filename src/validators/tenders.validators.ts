import { z } from 'zod';

export const createTenderSchema = z.object({
  title: z.string(),
  description: z.string(),
  budget: z.number().optional(),
  categoryId: z.string().optional(),
  deadline: z.coerce.date().optional(),
});

export const updateTenderSchema = createTenderSchema.partial();

export const tenderResponseSchema = z.object({
  tenderId: z.string().optional(),
  message: z.string(),
  price: z.number().optional(),
});

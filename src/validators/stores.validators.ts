import { z } from 'zod';

export const createStoreSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  ownerId: z.string().optional(),
  location: z.object({ lat: z.number(), lng: z.number(), address: z.string().optional() }),
});

export const updateStoreSchema = createStoreSchema.partial();

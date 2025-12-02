import { z } from 'zod';

export const createAdSchema = z.object({
  title: z.object({ ru: z.string(), en: z.string().optional(), pl: z.string().optional() }),
  description: z.object({ ru: z.string(), en: z.string().optional(), pl: z.string().optional() }),
  categoryId: z.string(),
  price: z.object({ amount: z.number().nonnegative(), currency: z.enum(['BYN', 'RUB', 'PLN', 'EUR']) }),
  location: z.object({ lat: z.number(), lng: z.number(), address: z.string().optional() }),
  media: z.array(z.object({ url: z.string(), type: z.enum(['image', 'video', 'document']), previewUrl: z.string().optional(), description: z.string().optional() })).optional(),
});

export const updateAdSchema = createAdSchema.partial();

export const searchAdsSchema = z.object({
  q: z.string().optional(),
  categoryId: z.string().optional(),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
  radiusKm: z.coerce.number().optional(),
  priceMin: z.coerce.number().optional(),
  priceMax: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  offset: z.coerce.number().optional(),
  page: z.coerce.number().optional(),
});

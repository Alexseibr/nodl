import { FilterQuery } from 'mongoose';
import { Ad, AdModel } from '../database/models/Ad.model';
import { FavoriteModel } from '../database/models/Favorite.model';
import { HeatmapEventModel } from '../database/models/HeatmapEvent.model';
import { PaymentModel } from '../database/models/Payment.model';
import { buildMultiCurrencyPrice } from '../utils/currency';
import { resolvePagination, buildMeta } from '../utils/pagination';
import { RequestContext } from '../types/context';
import { AppError } from '../utils/errors';
import { CurrencyCode } from '../database/types/currency.types';

export interface SearchAdsFilters {
  q?: string;
  categoryId?: string;
  lat?: number;
  lng?: number;
  radiusKm?: number;
  priceMin?: number;
  priceMax?: number;
  limit?: number;
  offset?: number;
  page?: number;
}

export const AdsService = {
  async searchAds(filters: SearchAdsFilters, ctx: RequestContext) {
    const query: FilterQuery<Ad> = {};

    if (filters.q) {
      query.$text = { $search: filters.q } as never;
    }
    if (filters.categoryId) {
      query.category = filters.categoryId as never;
    }
    if (filters.lat && filters.lng && filters.radiusKm) {
      query['location.coordinates'] = {
        $nearSphere: {
          $geometry: { type: 'Point', coordinates: [filters.lng, filters.lat] },
          $maxDistance: filters.radiusKm * 1000,
        },
      } as never;
    }

    const currency: CurrencyCode = ctx.countryCode === 'BY' ? 'BYN' : ctx.countryCode === 'RU' ? 'RUB' : ctx.countryCode === 'PL' ? 'PLN' : 'EUR';
    if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
      query[`price.values.${currency}`] = {} as never;
      if (filters.priceMin !== undefined) {
        (query[`price.values.${currency}`] as Record<string, number>).$gte = filters.priceMin;
      }
      if (filters.priceMax !== undefined) {
        (query[`price.values.${currency}`] as Record<string, number>).$lte = filters.priceMax;
      }
    }

    const { limit, offset, page } = resolvePagination(filters);
    const [items, total] = await Promise.all([
      AdModel.find(query).skip(offset).limit(limit).sort({ createdAt: -1 }),
      AdModel.countDocuments(query),
    ]);

    return buildMeta(items, total, page, limit);
  },

  async createAd(payload: any, userId: string, ctx: RequestContext) {
    const price = buildMultiCurrencyPrice(payload.price.amount, payload.price.currency);
    const ad = await AdModel.create({
      title: payload.title,
      description: payload.description,
      category: payload.categoryId,
      owner: userId,
      price,
      location: { type: 'Point', coordinates: [payload.location.lng, payload.location.lat], address: payload.location.address },
      media: payload.media,
      moderation: { status: 'pending' },
    });
    return ad;
  },

  async getAd(id: string) {
    const ad = await AdModel.findById(id);
    if (!ad) throw AppError.notFound('Ad not found');
    return ad;
  },

  async updateAd(id: string, payload: any, userId: string) {
    const ad = await AdModel.findById(id);
    if (!ad) throw AppError.notFound('Ad not found');
    if (ad.owner.toString() !== userId) throw AppError.forbidden();

    if (payload.price) {
      payload.price = buildMultiCurrencyPrice(payload.price.amount, payload.price.currency);
    }
    if (payload.location) {
      payload.location = { type: 'Point', coordinates: [payload.location.lng, payload.location.lat], address: payload.location.address };
    }

    Object.assign(ad, payload);
    await ad.save();
    return ad;
  },

  async deleteAd(id: string, userId: string) {
    const ad = await AdModel.findById(id);
    if (!ad) throw AppError.notFound('Ad not found');
    if (ad.owner.toString() !== userId) throw AppError.forbidden();
    await ad.deleteOne();
    return true;
  },

  async registerView(adId: string, ctx: RequestContext, payload?: { lat?: number; lng?: number; address?: string }) {
    await HeatmapEventModel.create({
      type: 'view',
      user: ctx.userId,
      location: { type: 'Point', coordinates: [payload?.lng || 0, payload?.lat || 0], address: payload?.address },
      payload: { adId },
    });
  },

  async setFavorite(adId: string, userId: string, value: boolean) {
    if (value) {
      await FavoriteModel.updateOne(
        { user: userId, target: adId, type: 'ad' },
        { $set: { user: userId, target: adId, type: 'ad', typeModel: 'Ad' } },
        { upsert: true },
      );
    } else {
      await FavoriteModel.deleteOne({ user: userId, target: adId, type: 'ad' });
    }
  },

  async bumpAd(adId: string, userId: string) {
    const payment = await PaymentModel.create({
      user: userId,
      amount: { amount: 0, currency: 'EUR' },
      provider: 'manual',
      status: 'succeeded',
      meta: { type: 'bump', adId },
    });
    return payment;
  },

  async highlightAd(adId: string, userId: string) {
    const payment = await PaymentModel.create({
      user: userId,
      amount: { amount: 0, currency: 'EUR' },
      provider: 'manual',
      status: 'succeeded',
      meta: { type: 'highlight', adId },
    });
    return payment;
  },
};

import { TenderModel } from '../database/models/Tender.model';
import { buildMultiCurrencyPrice } from '../utils/currency';
import { resolvePagination, buildMeta } from '../utils/pagination';
import { AppError } from '../utils/errors';

export const TendersService = {
  async list(params: { limit?: number; offset?: number; page?: number }) {
    const { limit, offset, page } = resolvePagination(params);
    const [items, total] = await Promise.all([
      TenderModel.find({ status: { $ne: 'closed' } }).skip(offset).limit(limit).sort({ createdAt: -1 }),
      TenderModel.countDocuments({ status: { $ne: 'closed' } }),
    ]);
    return buildMeta(items, total, page, limit);
  },

  async create(payload: any, userId: string) {
    const budget = payload.budget ? buildMultiCurrencyPrice(payload.budget.amount, payload.budget.currency) : undefined;
    const tender = await TenderModel.create({
      title: { ru: payload.title },
      description: { ru: payload.description },
      customer: userId,
      category: payload.categoryId,
      budget,
      location: payload.location
        ? { type: 'Point', coordinates: [payload.location.lng, payload.location.lat], address: payload.location.address }
        : undefined,
      status: 'published',
      moderation: { status: 'pending' },
    });
    return tender;
  },

  async get(id: string) {
    const tender = await TenderModel.findById(id);
    if (!tender) throw AppError.notFound('Tender not found');
    return tender;
  },

  async update(id: string, payload: any, userId: string) {
    const tender = await TenderModel.findById(id);
    if (!tender) throw AppError.notFound('Tender not found');
    if (tender.customer.toString() !== userId) throw AppError.forbidden();
    if (payload.budget) {
      payload.budget = buildMultiCurrencyPrice(payload.budget.amount, payload.budget.currency);
    }
    if (payload.location) {
      payload.location = { type: 'Point', coordinates: [payload.location.lng, payload.location.lat], address: payload.location.address };
    }
    Object.assign(tender, payload);
    await tender.save();
    return tender;
  },

  async close(id: string, userId: string) {
    const tender = await TenderModel.findById(id);
    if (!tender) throw AppError.notFound('Tender not found');
    if (tender.customer.toString() !== userId) throw AppError.forbidden();
    tender.status = 'closed';
    await tender.save();
    return tender;
  },
};

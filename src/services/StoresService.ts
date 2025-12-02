import { StoreModel } from '../database/models/Store.model';
import { resolvePagination, buildMeta } from '../utils/pagination';
import { AppError } from '../utils/errors';

export const StoresService = {
  async list(params: { limit?: number; offset?: number; page?: number }) {
    const { limit, offset, page } = resolvePagination(params);
    const [items, total] = await Promise.all([
      StoreModel.find({}).skip(offset).limit(limit).sort({ createdAt: -1 }),
      StoreModel.countDocuments(),
    ]);
    return buildMeta(items, total, page, limit);
  },

  async create(payload: any, ownerId: string) {
    const store = await StoreModel.create({
      owner: ownerId,
      title: payload.title,
      description: payload.description,
      location: { type: 'Point', coordinates: [payload.location.lng, payload.location.lat], address: payload.location.address },
      moderation: { status: 'pending' },
    });
    return store;
  },

  async get(id: string) {
    const store = await StoreModel.findById(id);
    if (!store) throw AppError.notFound('Store not found');
    return store;
  },

  async update(id: string, payload: any, userId: string) {
    const store = await StoreModel.findById(id);
    if (!store) throw AppError.notFound('Store not found');
    if (store.owner.toString() !== userId) throw AppError.forbidden();
    if (payload.location) {
      payload.location = { type: 'Point', coordinates: [payload.location.lng, payload.location.lat], address: payload.location.address };
    }
    Object.assign(store, payload);
    await store.save();
    return store;
  },

  async remove(id: string, userId: string) {
    const store = await StoreModel.findById(id);
    if (!store) throw AppError.notFound('Store not found');
    if (store.owner.toString() !== userId) throw AppError.forbidden();
    await store.deleteOne();
    return true;
  },
};

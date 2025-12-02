import { ReviewModel } from '../database/models/Review.model';
import { resolvePagination, buildMeta } from '../utils/pagination';
import { AppError } from '../utils/errors';

export const ReviewsService = {
  async list(params: { targetUser?: string; limit?: number; offset?: number; page?: number }) {
    const { limit, offset, page } = resolvePagination(params);
    const query = params.targetUser ? { targetUser: params.targetUser } : {};
    const [items, total] = await Promise.all([
      ReviewModel.find(query).skip(offset).limit(limit).sort({ createdAt: -1 }),
      ReviewModel.countDocuments(query),
    ]);
    return buildMeta(items, total, page, limit);
  },

  async create(payload: any, userId: string) {
    const review = await ReviewModel.create({ author: userId, targetUser: payload.targetUser, rating: payload.rating, comment: payload.comment });
    return review;
  },

  async remove(id: string, userId: string) {
    const review = await ReviewModel.findById(id);
    if (!review) throw AppError.notFound('Review not found');
    if (review.author.toString() !== userId) throw AppError.forbidden();
    await review.deleteOne();
    return true;
  },
};

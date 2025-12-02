import { ReviewModel } from '../models/Review.model';

export const buildReviewIndexes = async (): Promise<void> => {
  await ReviewModel.collection.createIndex({ targetUser: 1, createdAt: -1 });
};

import { WorkerDocument } from '../models/Worker';
import { WorkerOrderDocument } from '../models/WorkerOrder';

export interface RankingContext {
  distanceKm?: number;
  recentActivityScore?: number;
  portfolioScore?: number;
}

export function computeRankingScore(
  worker: WorkerDocument,
  order: WorkerOrderDocument,
  context: RankingContext
): number {
  const ratingScore = (worker.rating || 0) * 10;
  const reviewWeight = Math.min(worker.reviewsCount || 0, 50) * 0.5;
  const distanceScore = context.distanceKm ? Math.max(0, 10 - context.distanceKm) : 5;
  const activityScore = context.recentActivityScore ?? (worker.lastActive ? 5 : 2);
  const portfolioScore = context.portfolioScore ?? (worker.portfolio?.length ? 5 : 0);
  const priceScore = computePriceScore(worker, order);

  return ratingScore + reviewWeight + distanceScore + activityScore + portfolioScore + priceScore;
}

function computePriceScore(worker: WorkerDocument, order: WorkerOrderDocument): number {
  if (!order.budget || (!worker.priceFrom && !worker.priceTo)) {
    return 3;
  }
  const priceFrom = worker.priceFrom ?? worker.priceTo ?? order.budget;
  const priceTo = worker.priceTo ?? worker.priceFrom ?? order.budget;
  if (order.budget >= priceFrom && order.budget <= priceTo) {
    return 8;
  }
  return order.budget > priceTo ? 6 : 4;
}

export function buildChatRoomId(orderId: string): string {
  return `chat/order_${orderId}`;
}

export function projectWorkerCard(worker: WorkerDocument, distanceKm?: number) {
  return {
    id: worker._id,
    name: worker.name,
    avatar: worker.avatar,
    categories: worker.categories,
    rating: worker.rating ?? 0,
    reviewsCount: worker.reviewsCount ?? 0,
    priceFrom: worker.priceFrom,
    priceTo: worker.priceTo,
    city: worker.city,
    distanceKm,
    isVerified: worker.isVerified,
    tags: worker.tags,
  };
}

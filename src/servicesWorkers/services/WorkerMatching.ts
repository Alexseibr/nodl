import { WorkerModel, WorkerDocument } from '../models/Worker';
import { WorkerOrderDocument } from '../models/WorkerOrder';
import { WorkerResponseModel } from '../models/WorkerResponse';
import { computeRankingScore, projectWorkerCard } from './WorkerEngine';

interface MatchResult {
  worker: WorkerDocument;
  score: number;
  distanceKm?: number;
}

function haversineDistance(a: { lat?: number; lng?: number }, b: { lat?: number; lng?: number }): number {
  if (!a.lat || !a.lng || !b.lat || !b.lng) return 0;
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;

  const sinLat = Math.sin(dLat / 2) ** 2;
  const sinLon = Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.asin(Math.sqrt(sinLat + Math.cos(lat1) * Math.cos(lat2) * sinLon));
  return R * c;
}

export async function findMatchesForOrder(order: WorkerOrderDocument) {
  const candidates = await WorkerModel.find({ categories: order.category })
    .limit(100)
    .lean();
  const matches: MatchResult[] = candidates.map((worker) => {
    const distanceKm = order.geo
      ? haversineDistance(
          { lat: worker.geo?.lat, lng: worker.geo?.lng },
          { lat: order.geo?.lat, lng: order.geo?.lng }
        )
      : undefined;
    const score = computeRankingScore(worker as unknown as WorkerDocument, order, {
      distanceKm,
      portfolioScore: worker.portfolio?.length ? 5 : 0,
    });
    return { worker: worker as unknown as WorkerDocument, score, distanceKm };
  });

  matches.sort((a, b) => b.score - a.score);
  const top5 = matches.slice(0, 5).map((m) => ({ worker: projectWorkerCard(m.worker, m.distanceKm), score: m.score }));
  const nearby = matches
    .filter((m) => (m.distanceKm ?? 0) > 0 && (m.distanceKm ?? 0) <= 10)
    .slice(0, 20)
    .map((m) => projectWorkerCard(m.worker, m.distanceKm));

  return {
    top5,
    nearby,
    workedOnSimilar: await findSimilarWorkers(order),
  };
}

async function findSimilarWorkers(order: WorkerOrderDocument) {
  const responses = await WorkerResponseModel.find({ orderId: order._id, status: 'accepted' })
    .limit(20)
    .lean();
  const workerIds = responses.map((r) => r.workerId);
  const workers = await WorkerModel.find({ _id: { $in: workerIds } }).lean();
  return workers.map((w) => projectWorkerCard(w as unknown as WorkerDocument));
}

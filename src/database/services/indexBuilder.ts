import {
  buildAdIndexes,
  buildUserIndexes,
  buildStoreIndexes,
  buildTenderIndexes,
  buildGeoIndexes,
  buildReviewIndexes,
} from '../indexes';

export const buildAllIndexes = async (): Promise<void> => {
  await buildUserIndexes();
  await buildStoreIndexes();
  await buildAdIndexes();
  await buildTenderIndexes();
  await buildGeoIndexes();
  await buildReviewIndexes();
};

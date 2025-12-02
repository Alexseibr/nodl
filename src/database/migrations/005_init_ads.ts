import { AdModel } from '../models/Ad.model';

export const run005_init_ads = async (): Promise<void> => {
  await AdModel.createCollection();
  await AdModel.syncIndexes();
  console.log('Migration 005_init_ads done');
};

export const up = run005_init_ads;

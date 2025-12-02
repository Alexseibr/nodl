import { StoreModel } from '../models/Store.model';

export const run004_init_stores = async (): Promise<void> => {
  await StoreModel.createCollection();
  await StoreModel.syncIndexes();
  console.log('Migration 004_init_stores done');
};

export const up = run004_init_stores;

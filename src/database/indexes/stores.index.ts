import { StoreModel } from '../models/Store.model';

export const buildStoreIndexes = async (): Promise<void> => {
  await StoreModel.collection.createIndex({ 'location.coordinates': '2dsphere' });
  await StoreModel.collection.createIndex({ owner: 1 });
};

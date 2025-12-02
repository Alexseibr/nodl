import { AdModel } from '../models/Ad.model';

export const buildAdIndexes = async (): Promise<void> => {
  await AdModel.collection.createIndex({ 'location.coordinates': '2dsphere' });
  await AdModel.collection.createIndex({ category: 1, 'price.baseCurrency': 1 });
};

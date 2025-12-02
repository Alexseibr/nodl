import { TenderModel } from '../models/Tender.model';

export const buildTenderIndexes = async (): Promise<void> => {
  await TenderModel.collection.createIndex({ status: 1, createdAt: -1 });
  await TenderModel.collection.createIndex({ category: 1 });
};

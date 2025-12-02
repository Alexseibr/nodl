import { TenderModel } from '../models/Tender.model';

export const run006_init_tenders = async (): Promise<void> => {
  await TenderModel.createCollection();
  await TenderModel.syncIndexes();
  console.log('Migration 006_init_tenders done');
};

export const up = run006_init_tenders;

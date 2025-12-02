import { TenderResponseModel } from '../models/TenderResponse.model';

export const run007_init_tender_responses = async (): Promise<void> => {
  await TenderResponseModel.createCollection();
  await TenderResponseModel.syncIndexes();
  console.log('Migration 007_init_tender_responses done');
};

export const up = run007_init_tender_responses;

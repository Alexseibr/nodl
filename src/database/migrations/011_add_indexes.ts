import { AdModel } from '../models/Ad.model';
import { HeatmapEventModel } from '../models/HeatmapEvent.model';
import { ReviewModel } from '../models/Review.model';
import { StoreModel } from '../models/Store.model';
import { TenderModel } from '../models/Tender.model';
import { UserModel } from '../models/User.model';

export const run011_add_indexes = async (): Promise<void> => {
  await Promise.all([
    UserModel.syncIndexes(),
    StoreModel.syncIndexes(),
    AdModel.syncIndexes(),
    TenderModel.syncIndexes(),
    ReviewModel.syncIndexes(),
    HeatmapEventModel.syncIndexes(),
  ]);

  console.log('Migration 011_add_indexes done');
};

export const up = run011_add_indexes;

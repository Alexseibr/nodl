import { HeatmapEventModel } from '../models/HeatmapEvent.model';

export const run010_init_heatmap = async (): Promise<void> => {
  await HeatmapEventModel.createCollection();
  await HeatmapEventModel.syncIndexes();
  console.log('Migration 010_init_heatmap done');
};

export const up = run010_init_heatmap;

import { HeatmapEventModel } from '../database/models/HeatmapEvent.model';

export const AnalyticsService = {
  async adHeatmap(adId: string) {
    return HeatmapEventModel.find({ 'payload.adId': adId, type: 'view' }).limit(500).sort({ createdAt: -1 });
  },
  async storeHeatmap(storeId: string) {
    return HeatmapEventModel.find({ 'payload.storeId': storeId, type: 'view' }).limit(500).sort({ createdAt: -1 });
  },
};

import { Schema, model, Document, Types } from 'mongoose';
import { GeoPointSchema } from './common';

export interface HeatmapEvent extends Document {
  adId: Types.ObjectId;
  viewLocation: { type: 'Point'; coordinates: [number, number] };
  timestamp: Date;
  userSegment: 'guest' | 'logged' | 'builder';
  cityId?: Types.ObjectId;
  geoHash?: string;
}

const HeatmapEventSchema = new Schema<HeatmapEvent>({
  adId: { type: Types.ObjectId, ref: 'Ad', required: true },
  viewLocation: { type: GeoPointSchema, required: true },
  timestamp: { type: Date, default: Date.now },
  userSegment: { type: String, enum: ['guest', 'logged', 'builder'], default: 'guest' },
  cityId: { type: Types.ObjectId, ref: 'City' },
  geoHash: String,
});

HeatmapEventSchema.index({ adId: 1, timestamp: -1 });
HeatmapEventSchema.index({ viewLocation: '2dsphere' });
HeatmapEventSchema.index({ userSegment: 1 });

export const HeatmapEventModel = model<HeatmapEvent>('HeatmapEvent', HeatmapEventSchema);

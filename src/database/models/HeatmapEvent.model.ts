import { Schema, model, Document } from 'mongoose';
import { GeoPoint } from '../schemas/common/geoPoint.schema';

export interface HeatmapEvent extends Document {
  type: 'view' | 'click' | 'conversion';
  user?: Schema.Types.ObjectId;
  location: GeoPoint;
  payload?: Record<string, unknown>;
  createdAt: Date;
}

const GeoSchema = new Schema<GeoPoint>({
  type: { type: String, enum: ['Point'], default: 'Point' },
  coordinates: { type: [Number], required: true },
  address: String,
});

const HeatmapEventSchema = new Schema<HeatmapEvent>({
  type: { type: String, enum: ['view', 'click', 'conversion'], required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  location: { type: GeoSchema, required: true },
  payload: Schema.Types.Mixed,
}, { timestamps: { createdAt: true, updatedAt: false } });

HeatmapEventSchema.index({ 'location.coordinates': '2dsphere' });

export const HeatmapEventModel = model<HeatmapEvent>('HeatmapEvent', HeatmapEventSchema);

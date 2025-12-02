import { Schema, model, Document } from 'mongoose';
import { MediaItemSchema } from '../schemas/common/mediaItem.schema';

export interface Media extends Document, MediaItemSchema {
  owner?: Schema.Types.ObjectId;
  createdAt: Date;
}

const MediaSchemaDef = new Schema<MediaItemSchema>({
  url: { type: String, required: true },
  type: { type: String, enum: ['image', 'video', 'document'], required: true },
  previewUrl: String,
  description: String,
}, { _id: false });

const MediaSchema = new Schema<Media>({
  ...MediaSchemaDef.obj,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: { createdAt: true, updatedAt: false } });

MediaSchema.index({ owner: 1, createdAt: -1 });

export const MediaModel = model<Media>('Media', MediaSchema);

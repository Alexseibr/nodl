export interface MediaItemSchema {
  url: string;
  type: 'image' | 'video' | 'document';
  previewUrl?: string;
  description?: string;
}

export const createMediaItem = (url: string, type: MediaItemSchema['type']): MediaItemSchema => ({
  url,
  type,
});

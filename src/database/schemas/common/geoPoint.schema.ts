export interface GeoPoint {
  type: 'Point';
  coordinates: [number, number];
  address?: string;
}

export const createGeoPoint = (lat: number, lng: number, address?: string): GeoPoint => ({
  type: 'Point',
  coordinates: [lng, lat],
  address,
});

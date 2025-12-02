import { GeoCityModel } from '../models/GeoCity.model';
import { GeoRegionModel } from '../models/GeoRegion.model';

export const buildGeoIndexes = async (): Promise<void> => {
  await GeoCityModel.collection.createIndex({ countryCode: 1, regionName: 1, name: 1 }, { unique: true });
  await GeoCityModel.collection.createIndex({ lat: 1, lng: 1 });
  await GeoRegionModel.collection.createIndex({ countryCode: 1, name: 1 }, { unique: true });
};

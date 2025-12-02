import { GeoCityModel } from '../models/GeoCity.model';
import { GeoCountryModel } from '../models/GeoCountry.model';
import { GeoRegionModel } from '../models/GeoRegion.model';
import { seedGeo } from '../seed/seedGeo';

export const run002_init_geo = async (): Promise<void> => {
  await GeoCountryModel.createCollection();
  await GeoRegionModel.createCollection();
  await GeoCityModel.createCollection();

  await GeoCountryModel.syncIndexes();
  await GeoRegionModel.syncIndexes();
  await GeoCityModel.syncIndexes();

  await seedGeo();

  console.log('Migration 002_init_geo done');
};

export const up = run002_init_geo;

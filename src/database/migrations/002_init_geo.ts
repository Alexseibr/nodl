import { GeoCountryModel } from "../models/GeoCountry.model";
import { GeoRegionModel } from "../models/GeoRegion.model";
import { GeoCityModel } from "../models/GeoCity.model";
import { seedGeo } from "../seed/seedGeo";

export async function run002_init_geo() {
  await GeoCountryModel.createCollection();
  await GeoRegionModel.createCollection();
  await GeoCityModel.createCollection();

  await seedGeo();
  console.log("Migration 002_init_geo done");
}


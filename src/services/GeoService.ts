import { GeoCountryModel } from '../database/models/GeoCountry.model';
import { GeoRegionModel } from '../database/models/GeoRegion.model';
import { GeoCityModel } from '../database/models/GeoCity.model';
import { AppError } from '../utils/errors';

export const GeoService = {
  listCountries() {
    return GeoCountryModel.find({}).sort({ name: 1 });
  },
  listRegions(countryCode?: string) {
    const query = countryCode ? { countryCode } : {};
    return GeoRegionModel.find(query).sort({ name: 1 });
  },
  listCities(regionName?: string, countryCode?: string) {
    const query: any = {};
    if (regionName) query.regionName = regionName;
    if (countryCode) query.countryCode = countryCode;
    return GeoCityModel.find(query).sort({ name: 1 });
  },
  async getCity(id: string) {
    const city = await GeoCityModel.findById(id);
    if (!city) throw AppError.notFound('City not found');
    return city;
  },
};

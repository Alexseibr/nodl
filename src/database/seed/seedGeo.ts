import { GeoCountryModel } from '../models/GeoCountry.model';
import { GeoRegionModel } from '../models/GeoRegion.model';
import { GeoCityModel } from '../models/GeoCity.model';

export const seedGeo = async (): Promise<void> => {
  const countries = [
    { code: 'BY', name: 'Belarus', currency: 'BYN' },
    { code: 'RU', name: 'Russia', currency: 'RUB' },
    { code: 'PL', name: 'Poland', currency: 'PLN' },
  ];

  for (const country of countries) {
    await GeoCountryModel.updateOne({ code: country.code }, { $set: country }, { upsert: true });
  }

  await GeoRegionModel.updateOne(
    { countryCode: 'BY', name: 'Minskaya' },
    { $set: { countryCode: 'BY', name: 'Minskaya' } },
    { upsert: true },
  );

  await GeoCityModel.updateOne(
    { countryCode: 'BY', name: 'Minsk' },
    { $set: { countryCode: 'BY', name: 'Minsk', lat: 53.9, lng: 27.5667 } },
    { upsert: true },
  );
};

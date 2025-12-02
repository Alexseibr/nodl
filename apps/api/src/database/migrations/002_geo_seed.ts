import { CountryModel, RegionModel, CityModel } from '../../models/Geo';

export async function up() {
  await CountryModel.createCollection();
  await RegionModel.createCollection();
  await CityModel.createCollection();

  await CountryModel.bulkWrite([
    {
      updateOne: {
        filter: { code: 'BY' },
        update: { code: 'BY', name: { ru: 'Беларусь', en: 'Belarus', pl: 'Białoruś' } },
        upsert: true,
      },
    },
    {
      updateOne: {
        filter: { code: 'RU' },
        update: { code: 'RU', name: { ru: 'Россия', en: 'Russia', pl: 'Rosja' } },
        upsert: true,
      },
    },
    {
      updateOne: {
        filter: { code: 'PL' },
        update: { code: 'PL', name: { ru: 'Польша', en: 'Poland', pl: 'Polska' } },
        upsert: true,
      },
    },
  ]);
}

export async function down() {
  await CountryModel.collection.drop();
  await RegionModel.collection.drop();
  await CityModel.collection.drop();
}

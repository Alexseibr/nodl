import { GeoCountryModel } from "../models/GeoCountry.model";
import { GeoRegionModel } from "../models/GeoRegion.model";
import { GeoCityModel } from "../models/GeoCity.model";

export async function seedGeo() {
  // простейший сид, потом расширишь
  await GeoCountryModel.deleteMany({});
  await GeoRegionModel.deleteMany({});
  await GeoCityModel.deleteMany({});

  const by = await GeoCountryModel.create({
    code: "BY",
    name: { ru: "Беларусь", en: "Belarus", pl: "Białoruś" },
    phoneCode: "+375",
    currencyCode: "BYN",
  });

  const ru = await GeoCountryModel.create({
    code: "RU",
    name: { ru: "Россия", en: "Russia", pl: "Rosja" },
    phoneCode: "+7",
    currencyCode: "RUB",
  });

  const pl = await GeoCountryModel.create({
    code: "PL",
    name: { ru: "Польша", en: "Poland", pl: "Polska" },
    phoneCode: "+48",
    currencyCode: "PLN",
  });

  const brestRegion = await GeoRegionModel.create({
    countryCode: "BY",
    name: { ru: "Брестская область", en: "Brest region", pl: "Obwód brzeski" },
  });

  await GeoCityModel.create({
    countryCode: "BY",
    regionId: brestRegion._id,
    name: { ru: "Брест", en: "Brest", pl: "Brześć" },
  });
}


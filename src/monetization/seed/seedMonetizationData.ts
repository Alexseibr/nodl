import {
  CurrencyModel,
  CountryModel,
  SubscriptionPlanModel,
  MonetizationFeatureModel,
  PaidLeadConfigModel,
  PromotionProductModel,
  EscrowConfigModel,
  CurrencyCode,
  PlanTranslation,
  PriceLocalized,
  CountryCode,
} from '../models';

/**
 * Seed monetization catalogs for BY, RU, PL markets.
 */
export async function seedMonetizationData() {
  await seedCurrencies();
  await seedCountries();
  await seedFeatures();
  await seedPlans();
  await seedLeadConfigs();
  await seedPromotions();
  await seedEscrowConfigs();
}

async function seedCurrencies() {
  const currencies = [
    {
      code: 'BYN',
      symbol: 'Br',
      name: { ru: 'Белорусский рубль', en: 'Belarusian ruble', pl: 'Białoruski rubel' },
      precision: 2,
      isDefaultForCountries: ['BY'],
    },
    {
      code: 'RUB',
      symbol: '₽',
      name: { ru: 'Российский рубль', en: 'Russian ruble', pl: 'Rubel rosyjski' },
      precision: 2,
      isDefaultForCountries: ['RU'],
    },
    {
      code: 'PLN',
      symbol: 'zł',
      name: { ru: 'Польский злотый', en: 'Polish złoty', pl: 'Złoty polski' },
      precision: 2,
      isDefaultForCountries: ['PL'],
    },
    {
      code: 'EUR',
      symbol: '€',
      name: { ru: 'Евро', en: 'Euro', pl: 'Euro' },
      precision: 2,
      isDefaultForCountries: [],
    },
  ];

  for (const currency of currencies) {
    await CurrencyModel.findOneAndUpdate({ code: currency.code }, currency, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }
}

async function seedCountries() {
  const countries = [
    {
      code: 'BY',
      name: { ru: 'Беларусь', en: 'Belarus', pl: 'Białoruś' },
      defaultCurrency: 'BYN',
      supportedCurrencies: ['BYN', 'EUR'],
      defaultLocale: 'ru',
      supportedLocales: ['ru', 'en', 'pl'],
    },
    {
      code: 'RU',
      name: { ru: 'Россия', en: 'Russia', pl: 'Rosja' },
      defaultCurrency: 'RUB',
      supportedCurrencies: ['RUB', 'EUR'],
      defaultLocale: 'ru',
      supportedLocales: ['ru', 'en', 'pl'],
    },
    {
      code: 'PL',
      name: { ru: 'Польша', en: 'Poland', pl: 'Polska' },
      defaultCurrency: 'PLN',
      supportedCurrencies: ['PLN', 'EUR'],
      defaultLocale: 'pl',
      supportedLocales: ['ru', 'en', 'pl'],
    },
  ];

  for (const country of countries) {
    await CountryModel.findOneAndUpdate({ code: country.code }, country, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }
}

async function seedFeatures() {
  const features = [
    createFeature(
      'unlimited_leads',
      'Безлимитные лиды',
      'Unlimited leads',
      'Nielimitowane leady',
      'Неограниченные отклики на заказы'
    ),
    createFeature(
      'priority_listing',
      'Приоритет в выдаче',
      'Priority listing',
      'Priorytetowa pozycja',
      'Выше позиция в каталоге'
    ),
    createFeature(
      'verified_badge',
      'Проверенный мастер',
      'Verified pro',
      'Zweryfikowany wykonawca',
      'Получите премиальный бейдж'
    ),
  ];

  for (const feature of features) {
    await MonetizationFeatureModel.findOneAndUpdate({ key: feature.key }, feature, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }
}

function createFeature(
  key: string,
  titleRu: string,
  titleEn: string,
  titlePl: string,
  description: string
) {
  const translations: PlanTranslation[] = [
    { locale: 'ru', title: titleRu, shortDescription: description },
    { locale: 'en', title: titleEn, shortDescription: description },
    { locale: 'pl', title: titlePl, shortDescription: description },
  ];

  return { key, translations };
}

async function seedPlans() {
  const plans = [
    buildPlan('BASIC', 0, 0, 0, ['Безлимитный профиль', 'Free profile'], []),
    buildPlan('PRO', 29, 990, 59, ['PRO тариф', 'PRO plan'], [
      'unlimited_leads',
      'priority_listing',
    ]),
    buildPlan('PRO_MAX', 79, 2490, 149, ['PRO MAX', 'PRO MAX'], [
      'unlimited_leads',
      'priority_listing',
      'verified_badge',
    ]),
  ];

  for (const plan of plans) {
    await SubscriptionPlanModel.findOneAndUpdate({ code: plan.code }, plan, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }
}

function buildPlan(
  code: string,
  bynPrice: number,
  rubPrice: number,
  plnPrice: number,
  titles: [string, string],
  features: string[]
) {
  const translations: PlanTranslation[] = [
    {
      locale: 'ru',
      title: `${titles[0]}`,
      shortDescription: `${titles[0]} для мастеров`,
      bulletPoints: features,
    },
    {
      locale: 'en',
      title: `${titles[1]}`,
      shortDescription: `${titles[1]} for pros`,
      bulletPoints: features,
    },
    {
      locale: 'pl',
      title: `${titles[0]}`,
      shortDescription: `${titles[0]} dla wykonawców`,
      bulletPoints: features,
    },
  ];

  const pricesByCountry = [
    createPrice('BY', bynPrice, 'BYN'),
    createPrice('RU', rubPrice, 'RUB'),
    createPrice('PL', plnPrice, 'PLN'),
  ];

  return {
    code,
    type: 'subscription',
    isActive: true,
    priority: code === 'BASIC' ? 0 : code === 'PRO' ? 1 : 2,
    translations,
    pricesByCountry,
    features,
    maxLeadsPerDay: null,
  };
}

function createPrice(countryCode: CountryCode, amount: number, currency: CurrencyCode) {
  const price: PriceLocalized = { amount, currency };
  return { countryCode, price, billingPeriod: 'month' as const };
}

async function seedLeadConfigs() {
  const categories = [
    'electricity',
    'tiling',
    'roofing',
    'plumbing',
  ];
  const priceMap: Record<CountryCode, number> = {
    BY: 5,
    RU: 150,
    PL: 18,
  };

  for (const countryCode of Object.keys(priceMap) as CountryCode[]) {
    for (const category of categories) {
      const amount = priceMap[countryCode];
      const currency = countryCode === 'BY' ? 'BYN' : countryCode === 'RU' ? 'RUB' : 'PLN';
      const basePrice: PriceLocalized = { amount, currency };
      await PaidLeadConfigModel.findOneAndUpdate(
        { categoryCode: category, countryCode },
        { categoryCode: category, countryCode, basePrice, isActive: true },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
  }
}

async function seedPromotions() {
  const products = [
    {
      code: 'RAISE_PROFILE',
      type: 'promotion',
      translations: buildTranslations('Поднять профиль', 'Raise profile', 'Podbij profil'),
      pricesByCountry: [
        { countryCode: 'BY', price: { amount: 5, currency: 'BYN' } },
        { countryCode: 'RU', price: { amount: 199, currency: 'RUB' } },
        { countryCode: 'PL', price: { amount: 12, currency: 'PLN' } },
      ],
      durationDays: 0,
    },
    {
      code: 'PIN_IN_TOP_DAILY',
      type: 'promotion',
      translations: buildTranslations('Закрепить в топе', 'Pin to top', 'Przypnij na górę'),
      pricesByCountry: [
        { countryCode: 'BY', price: { amount: 12, currency: 'BYN' } },
        { countryCode: 'RU', price: { amount: 399, currency: 'RUB' } },
        { countryCode: 'PL', price: { amount: 25, currency: 'PLN' } },
      ],
      durationDays: 1,
    },
    {
      code: 'VERIFIED_BADGE',
      type: 'promotion',
      translations: buildTranslations('Проверенный мастер', 'Verified badge', 'Zweryfikowany wykonawca'),
      pricesByCountry: [
        { countryCode: 'BY', price: { amount: 49, currency: 'BYN' } },
        { countryCode: 'RU', price: { amount: 1490, currency: 'RUB' } },
        { countryCode: 'PL', price: { amount: 129, currency: 'PLN' } },
      ],
      durationDays: null,
    },
  ];

  for (const product of products) {
    await PromotionProductModel.findOneAndUpdate({ code: product.code }, product, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }
}

function buildTranslations(ru: string, en: string, pl: string): PlanTranslation[] {
  return [
    { locale: 'ru', title: ru, shortDescription: ru },
    { locale: 'en', title: en, shortDescription: en },
    { locale: 'pl', title: pl, shortDescription: pl },
  ];
}

async function seedEscrowConfigs() {
  const configs = [
    {
      countryCode: 'BY' as CountryCode,
      minFeePercent: 2,
      maxFeePercent: 6,
      defaultFeePercent: 3,
      minFeeAbsolute: { amount: 2, currency: 'BYN' },
      maxFeeAbsolute: { amount: 50, currency: 'BYN' },
    },
    {
      countryCode: 'RU' as CountryCode,
      minFeePercent: 2,
      maxFeePercent: 6,
      defaultFeePercent: 4,
      minFeeAbsolute: { amount: 50, currency: 'RUB' },
      maxFeeAbsolute: { amount: 500, currency: 'RUB' },
    },
    {
      countryCode: 'PL' as CountryCode,
      minFeePercent: 1.5,
      maxFeePercent: 5,
      defaultFeePercent: 3,
      minFeeAbsolute: { amount: 10, currency: 'PLN' },
      maxFeeAbsolute: { amount: 400, currency: 'PLN' },
    },
  ];

  for (const config of configs) {
    await EscrowConfigModel.findOneAndUpdate({ countryCode: config.countryCode }, config, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }
}

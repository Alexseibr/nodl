import { CountryCode } from '../models/Country';
import { CountryModel } from '../models/Country';
import { SupportedLocale, CurrencyCode } from '../models/Currency';
import { PlanTranslation, PriceLocalized } from '../models/common';

export interface LocalizableEntity {
  translations: PlanTranslation[];
}

export interface UserLike {
  country?: CountryCode;
  locale?: SupportedLocale;
  currency?: CurrencyCode;
}

export interface UserContext {
  countryCode: CountryCode;
  currencyCode: CurrencyCode;
  locale: SupportedLocale;
}

const currencySymbols: Record<CurrencyCode, string> = {
  BYN: 'Br',
  RUB: '₽',
  PLN: 'zł',
  EUR: '€',
};

/**
 * Pick translation by locale with fallbacks.
 */
export function pickTranslation<T extends LocalizableEntity>(
  entity: T,
  locale: SupportedLocale,
  fallbackLocale?: SupportedLocale
): PlanTranslation {
  const direct = entity.translations.find((t) => t.locale === locale);
  if (direct) {
    return direct;
  }

  if (fallbackLocale) {
    const fallback = entity.translations.find((t) => t.locale === fallbackLocale);
    if (fallback) {
      return fallback;
    }
  }

  const english = entity.translations.find((t) => t.locale === 'en');
  if (english) {
    return english;
  }

  return entity.translations[0];
}

/**
 * Find localized price for country with fallback.
 */
export function findPriceForCountry(
  pricesByCountry: { countryCode: CountryCode; price: PriceLocalized }[],
  countryCode: CountryCode,
  fallbackCountryCode?: CountryCode
): PriceLocalized | null {
  const primary = pricesByCountry.find((p) => p.countryCode === countryCode);
  if (primary) {
    return primary.price;
  }

  if (fallbackCountryCode) {
    const fallback = pricesByCountry.find((p) => p.countryCode === fallbackCountryCode);
    if (fallback) {
      return fallback.price;
    }
  }

  return null;
}

/**
 * Resolve country and currency for user. Falls back to country defaults.
 */
export function getUserCountryAndCurrency(user: UserLike): {
  countryCode: CountryCode;
  currencyCode: CurrencyCode;
} {
  const fallbackCountry = user.country ?? 'BY';
  const fallbackCurrency = user.currency ?? inferCurrencyFromCountry(fallbackCountry);
  return {
    countryCode: fallbackCountry,
    currencyCode: fallbackCurrency,
  };
}

export function resolveUserLocale(user: UserLike): SupportedLocale {
  if (user.locale && ['ru', 'en', 'pl'].includes(user.locale)) {
    return user.locale;
  }
  const countryLocale = getDefaultLocaleForCountry(user.country ?? 'BY');
  return countryLocale ?? 'en';
}

export function getDefaultLocaleForCountry(
  countryCode: CountryCode
): SupportedLocale | undefined {
  const defaults: Record<CountryCode, SupportedLocale> = {
    BY: 'ru',
    RU: 'ru',
    PL: 'pl',
  };
  return defaults[countryCode];
}

function inferCurrencyFromCountry(country: CountryCode): CurrencyCode {
  const defaults: Record<CountryCode, CurrencyCode> = {
    BY: 'BYN',
    RU: 'RUB',
    PL: 'PLN',
  };

  return defaults[country] ?? 'EUR';
}

function isSupportedLocale(locale?: string | null): locale is SupportedLocale {
  return locale === 'ru' || locale === 'en' || locale === 'pl';
}

/**
 * Resolve user context (country, currency, locale) using stored preferences with
 * fallbacks from Country catalog.
 */
export async function resolveUserContext(
  user: UserLike,
  requestedLocale?: SupportedLocale
): Promise<UserContext> {
  const countryDoc = user.country
    ? await CountryModel.findOne({ code: user.country }).lean()
    : null;

  const countryCode = (countryDoc?.code || user.country || 'BY') as CountryCode;
  const supportedLocales = countryDoc?.supportedLocales ?? [];
  const supportedCurrencies = countryDoc?.supportedCurrencies ?? [];
  const defaultLocale = countryDoc?.defaultLocale ?? getDefaultLocaleForCountry(countryCode) ?? 'en';
  const resolvedLocale =
    (requestedLocale && isSupportedLocale(requestedLocale) &&
      (supportedLocales.length === 0 || supportedLocales.includes(requestedLocale)))
      ? requestedLocale
      : (isSupportedLocale(user.locale) &&
          (supportedLocales.length === 0 || supportedLocales.includes(user.locale))
          ? user.locale
          : defaultLocale);

  const countryDefaultCurrency = countryDoc?.defaultCurrency ?? inferCurrencyFromCountry(countryCode);
  const resolvedCurrency =
    user.currency && (supportedCurrencies.length === 0 || supportedCurrencies.includes(user.currency))
      ? user.currency
      : countryDefaultCurrency;

  return {
    countryCode,
    currencyCode: resolvedCurrency,
    locale: resolvedLocale,
  };
}

/**
 * Simple money formatter tuned for requested locales.
 */
export function formatMoney(price: PriceLocalized, locale: SupportedLocale): string {
  const symbol = currencySymbols[price.currency];
  const formatter = new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : locale === 'pl' ? 'pl-PL' : 'en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  if (locale === 'ru') {
    if (price.currency === 'RUB') return `${formatter.format(price.amount)} ${symbol}`;
    if (price.currency === 'PLN') return `${formatter.format(price.amount)} zł`;
    return `${formatter.format(price.amount)} ${price.currency}`;
  }

  if (locale === 'pl') {
    if (price.currency === 'PLN') return `${formatter.format(price.amount)} zł`;
    return `${formatter.format(price.amount)} ${price.currency}`;
  }

  return `${formatter.format(price.amount)} ${price.currency}`;
}

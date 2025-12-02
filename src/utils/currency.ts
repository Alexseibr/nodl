import { CurrencyCode, MultiCurrencyPrice } from '../database/types/currency.types';
import { convertAmount } from '../database/services/currencyConverter';

export const buildMultiCurrencyPrice = (amount: number, currency: CurrencyCode): MultiCurrencyPrice => {
  const base = { amount, currency } as const;
  const values: Partial<Record<CurrencyCode, number>> = {};
  (['BYN', 'RUB', 'PLN', 'EUR'] as CurrencyCode[]).forEach((code) => {
    values[code] = convertAmount(base, code).amount;
  });
  return { baseCurrency: currency, values };
};

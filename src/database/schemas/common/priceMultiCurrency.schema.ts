import { CurrencyCode, MultiCurrencyPrice } from '../../types';

export const createPrice = (
  baseCurrency: CurrencyCode,
  values: Partial<Record<CurrencyCode, number>>,
): MultiCurrencyPrice => ({
  baseCurrency,
  values,
});

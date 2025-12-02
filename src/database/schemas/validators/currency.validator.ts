import { CurrencyCode } from '../../types/currency.types';

export const isCurrencySupported = (currency: string): currency is CurrencyCode =>
  ['BYN', 'RUB', 'PLN', 'EUR'].includes(currency);

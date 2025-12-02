export type CurrencyCode = 'BYN' | 'RUB' | 'PLN' | 'EUR';

export interface MoneyAmount {
  amount: number;
  currency: CurrencyCode;
}

export interface MultiCurrencyPrice {
  baseCurrency: CurrencyCode;
  values: Partial<Record<CurrencyCode, number>>;
}

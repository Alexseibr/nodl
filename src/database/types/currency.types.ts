export type SupportedCurrency = "BYN" | "RUB" | "PLN" | "EUR";

export const SUPPORTED_CURRENCIES: SupportedCurrency[] = [
  "BYN",
  "RUB",
  "PLN",
  "EUR",
];

export interface MultiCurrencyPrice {
  originalAmount: number;
  originalCurrency: SupportedCurrency;
  BYN?: number;
  RUB?: number;
  PLN?: number;
  EUR?: number;
}


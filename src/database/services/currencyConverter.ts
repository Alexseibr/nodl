import { MultiCurrencyPrice, SupportedCurrency } from "../types";

// TODO: заменить на реальный сервис/курсы
const RATES: Record<SupportedCurrency, number> = {
  BYN: 1,
  RUB: 30,
  PLN: 1.3,
  EUR: 3.3,
};

export function convertAmount(
  amount: number,
  from: SupportedCurrency,
  to: SupportedCurrency
): number {
  if (from === to) return amount;
  const base = amount / (RATES[from] || 1);
  return Math.round(base * (RATES[to] || 1) * 100) / 100;
}

export function buildMultiCurrencyPrice(
  amount: number,
  currency: SupportedCurrency
): MultiCurrencyPrice {
  return {
    originalAmount: amount,
    originalCurrency: currency,
    BYN: convertAmount(amount, currency, "BYN"),
    RUB: convertAmount(amount, currency, "RUB"),
    PLN: convertAmount(amount, currency, "PLN"),
    EUR: convertAmount(amount, currency, "EUR"),
  };
}


import { CurrencyCode, MoneyAmount } from '../types/currency.types';

const defaultRates: Record<CurrencyCode, number> = {
  EUR: 1,
  BYN: 3.3,
  RUB: 95,
  PLN: 4.4,
};

export const convertAmount = (amount: MoneyAmount, to: CurrencyCode, rates: Record<CurrencyCode, number> = defaultRates): MoneyAmount => {
  const baseInEur = amount.amount / (rates[amount.currency] || 1);
  return { amount: Math.round(baseInEur * (rates[to] || 1) * 100) / 100, currency: to };
};

export const formatMoney = (amount: MoneyAmount): string => `${amount.amount.toFixed(2)} ${amount.currency}`;

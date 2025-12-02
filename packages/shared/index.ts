import type { Bid, Tender } from '../types';

type RateMap = Record<string, number>;

export function convertFromBase(amountEur: number, currency: string, rates: RateMap): number {
  const rate = rates[currency] ?? 1;
  return Math.round((amountEur * rate + Number.EPSILON) * 100) / 100;
}

export function formatTenderPrice(tender: Tender, rates: RateMap) {
  return {
    eur: tender.budgetEur,
    local: convertFromBase(tender.budgetEur, tender.currency, rates),
  };
}

export function formatBidPrice(bid: Bid, rates: RateMap) {
  return {
    eur: bid.priceEur,
    local: convertFromBase(bid.priceEur, bid.currency, rates),
  };
}

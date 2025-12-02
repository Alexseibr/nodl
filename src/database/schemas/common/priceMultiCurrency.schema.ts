import { Schema } from "mongoose";
import { MultiCurrencyPrice, SupportedCurrency } from "../../types";

export const PriceMultiCurrencySchema = new Schema<MultiCurrencyPrice>(
  {
    originalAmount: { type: Number, required: true, min: 0 },
    originalCurrency: {
      type: String,
      enum: ["BYN", "RUB", "PLN", "EUR"],
      required: true,
    },
    BYN: { type: Number, min: 0 },
    RUB: { type: Number, min: 0 },
    PLN: { type: Number, min: 0 },
    EUR: { type: Number, min: 0 },
  },
  { _id: false }
);

export function getDefaultCurrencyByCountry(
  countryCode?: string
): SupportedCurrency {
  switch (countryCode) {
    case "BY":
      return "BYN";
    case "RU":
      return "RUB";
    case "PL":
      return "PLN";
    default:
      return "EUR";
  }
}


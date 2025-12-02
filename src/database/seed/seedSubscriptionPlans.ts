import { SubscriptionPlanModel } from "../models/SubscriptionPlan.model";
import { buildMultiCurrencyPrice } from "../services/currencyConverter";

export async function seedSubscriptionPlans() {
  await SubscriptionPlanModel.deleteMany({});

  const plans = [
    {
      code: "FREE",
      countryCode: undefined,
      name: {
        ru: "Бесплатный",
        en: "Free",
        pl: "Darmowy",
      },
      description: {
        ru: "Базовый набор функций",
        en: "Basic features",
        pl: "Podstawowe funkcje",
      },
      price: buildMultiCurrencyPrice(0, "BYN"),
      billingCycle: "monthly",
      features: ["basic_ads"],
      order: 0,
    },
    {
      code: "PRO",
      countryCode: "BY",
      name: {
        ru: "PRO для Беларуси",
        en: "PRO Belarus",
        pl: "PRO Białoruś",
      },
      description: {
        ru: "Выделение, поднятия, аналитика",
        en: "Highlights, bumps, analytics",
        pl: "Wyróżnienia, podbicia, analityka",
      },
      price: buildMultiCurrencyPrice(30, "BYN"),
      billingCycle: "monthly",
      features: ["highlight", "bumps", "analytics"],
      order: 1,
    },
  ];

  for (const p of plans) {
    await SubscriptionPlanModel.create(p);
  }
}


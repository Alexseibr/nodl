import { FilterQuery } from 'mongoose';
import {
  CountryCode,
  EscrowConfigDocument,
  EscrowConfigModel,
  MonetizationFeatureModel,
  PaidLeadConfigDocument,
  PaidLeadConfigModel,
  PromotionProductDocument,
  PromotionProductModel,
  SubscriptionPlanDocument,
  SubscriptionPlanModel,
  SupportedLocale,
  PlanTranslation,
  PriceLocalized,
} from '../models';
import {
  findPriceForCountry,
  formatMoney,
  getDefaultLocaleForCountry,
  pickTranslation,
  resolveUserContext,
  UserContext,
  UserLike,
} from '../utils/locale';

export interface SubscriptionPlanDTO {
  code: string;
  title: string;
  description: string;
  price: PriceLocalized & { formatted: string } | null;
  billingPeriod: string | null;
  features: { key: string; label?: string; description?: string }[];
  maxLeadsPerDay?: number | null;
}

export interface PromotionProductDTO {
  code: string;
  title: string;
  description: string;
  price: PriceLocalized & { formatted: string } | null;
  durationDays?: number | null;
}

export async function getActiveSubscriptionPlansForUser(
  context: UserContext
): Promise<SubscriptionPlanDTO[]> {
  const { countryCode, locale } = context;
  const plans = await SubscriptionPlanModel.find({ isActive: true })
    .sort({ priority: -1 })
    .lean();
  const featuresMap = await loadFeatures(locale);

  return plans.map((plan) =>
    mapSubscriptionPlan(plan, countryCode, locale, featuresMap)
  );
}

export async function getLeadPriceForUser(
  context: UserContext,
  categoryCode: string
): Promise<PriceLocalized & { formatted: string } | null> {
  const { countryCode, locale } = context;
  const config = await PaidLeadConfigModel.findOne({
    categoryCode,
    countryCode,
    isActive: true,
  }).lean();

  if (!config) {
    return null;
  }

  const price = config.basePrice as PriceLocalized;
  return { ...price, formatted: formatMoney(price, locale) };
}

export async function getPromotionProductsForUser(
  context: UserContext
): Promise<PromotionProductDTO[]> {
  const { countryCode, locale } = context;
  const products = await PromotionProductModel.find().lean();

  return products.map((product) => mapPromotionProduct(product, countryCode, locale));
}

export async function getEscrowConfigForUser(
  context: UserContext
): Promise<EscrowConfigDocument | null> {
  const { countryCode } = context;
  return EscrowConfigModel.findOne({ countryCode }).lean();
}

export async function adminListSubscriptionPlans(): Promise<SubscriptionPlanDocument[]> {
  return SubscriptionPlanModel.find().lean();
}

export async function adminUpsertSubscriptionPlan(
  data: Partial<SubscriptionPlanDocument>
): Promise<SubscriptionPlanDocument> {
  const query: FilterQuery<SubscriptionPlanDocument> = { code: data.code } as FilterQuery<
    SubscriptionPlanDocument
  >;
  return SubscriptionPlanModel.findOneAndUpdate(query, data, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  });
}

export async function adminListLeadConfigs(): Promise<PaidLeadConfigDocument[]> {
  return PaidLeadConfigModel.find().lean();
}

export async function adminUpsertLeadConfig(
  data: Partial<PaidLeadConfigDocument>
): Promise<PaidLeadConfigDocument> {
  const query: FilterQuery<PaidLeadConfigDocument> = {
    categoryCode: data.categoryCode,
    countryCode: data.countryCode,
  } as FilterQuery<PaidLeadConfigDocument>;

  return PaidLeadConfigModel.findOneAndUpdate(query, data, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  });
}

export async function adminListPromotions(): Promise<PromotionProductDocument[]> {
  return PromotionProductModel.find().lean();
}

export async function adminUpsertPromotion(
  data: Partial<PromotionProductDocument>
): Promise<PromotionProductDocument> {
  const query: FilterQuery<PromotionProductDocument> = { code: data.code } as FilterQuery<
    PromotionProductDocument
  >;
  return PromotionProductModel.findOneAndUpdate(query, data, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  });
}

export async function adminListEscrowConfigs(): Promise<EscrowConfigDocument[]> {
  return EscrowConfigModel.find().lean();
}

export async function adminUpsertEscrowConfig(
  data: Partial<EscrowConfigDocument>
): Promise<EscrowConfigDocument> {
  const query: FilterQuery<EscrowConfigDocument> = { countryCode: data.countryCode } as FilterQuery<
    EscrowConfigDocument
  >;
  return EscrowConfigModel.findOneAndUpdate(query, data, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  });
}

async function loadFeatures(locale: SupportedLocale): Promise<
  Record<string, { label?: string; description?: string }>
> {
  const records = await MonetizationFeatureModel.find().lean();
  return records.reduce<Record<string, { label?: string; description?: string }>>(
    (acc, feature) => {
      const translation = pickTranslation(feature, locale);
      acc[feature.key] = {
        label: translation.title,
        description: translation.shortDescription,
      };
      return acc;
    },
    {}
  );
}

function mapSubscriptionPlan(
  plan: SubscriptionPlanDocument,
  countryCode: CountryCode,
  locale: SupportedLocale,
  featuresMap: Record<string, { label?: string; description?: string }>
): SubscriptionPlanDTO {
  const translation = pickTranslation(
    plan,
    locale,
    getDefaultLocaleForCountry(countryCode)
  );
  const price = findPriceForCountry(
    plan.pricesByCountry,
    countryCode,
    plan.pricesByCountry[0]?.countryCode as CountryCode | undefined
  );

  return {
    code: plan.code,
    title: translation.title,
    description: translation.shortDescription,
    price: price ? { ...price, formatted: formatMoney(price, locale) } : null,
    billingPeriod: price
      ? plan.pricesByCountry.find((p) => p.countryCode === countryCode)?.billingPeriod ?? null
      : null,
    features: plan.features.map((key) => ({ key, ...featuresMap[key] })),
    maxLeadsPerDay: plan.maxLeadsPerDay ?? null,
  };
}

function mapPromotionProduct(
  product: PromotionProductDocument,
  countryCode: CountryCode,
  locale: SupportedLocale
): PromotionProductDTO {
  const translation = pickTranslation(
    product,
    locale,
    getDefaultLocaleForCountry(countryCode)
  );
  const price = findPriceForCountry(
    product.pricesByCountry,
    countryCode,
    product.pricesByCountry[0]?.countryCode as CountryCode | undefined
  );
  return {
    code: product.code,
    title: translation.title,
    description: translation.shortDescription,
    price: price ? { ...price, formatted: formatMoney(price, locale) } : null,
    durationDays: product.durationDays ?? null,
  };
}

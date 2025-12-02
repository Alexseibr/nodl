import { MonetizationService } from '../monetization/monetization.service';
import { subscriptionPlans } from './subscription-plans';
import { SubscriptionPlanDto, SubscriptionResponse } from './subscriptions.types';
import { SubscriptionPlanCode } from '../monetization/monetization.types';

export class SubscriptionsService {
  constructor(private readonly monetizationService: MonetizationService) {}

  getPlans(): SubscriptionPlanDto[] {
    return Object.entries(subscriptionPlans).map(([code, plan]) => ({
      code: code as SubscriptionPlanCode,
      title: plan.title,
      limits: plan.limits,
      features: plan.features,
      price: plan.price,
    }));
  }

  buy(userId: string, plan: SubscriptionPlanCode, country: string, currency: string): SubscriptionResponse {
    return this.monetizationService.createSubscription(userId, plan, country as any, currency as any);
  }

  cancel(userId: string): SubscriptionResponse | undefined {
    return this.monetizationService.cancelSubscription(userId);
  }

  getMySubscription(userId: string): SubscriptionResponse | undefined {
    return this.monetizationService.getSubscription(userId);
  }
}

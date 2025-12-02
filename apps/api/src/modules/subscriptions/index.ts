import { createSubscriptionsRouter } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { monetizationService } from '../monetization';

export const subscriptionsService = new SubscriptionsService(monetizationService);
export const subscriptionsRouter = createSubscriptionsRouter(subscriptionsService);

export * from './subscriptions.types';
export * from './subscription-plans';

import { MonetizationRepository } from './monetization.repository';
import { MonetizationService } from './monetization.service';
import { createMonetizationRouter } from './monetization.controller';

export const monetizationRepository = new MonetizationRepository();
export const monetizationService = new MonetizationService(monetizationRepository);
export const monetizationRouter = createMonetizationRouter(monetizationService);

export * from './monetization.types';
export * from './monetization.dto';
export * from './monetization.service';

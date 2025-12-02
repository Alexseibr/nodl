import { createTendersRouter } from './tenders.routes';
import { TenderRepository } from './tenders.repository';
import { TenderService } from './tenders.service';

export const tenderRepository = new TenderRepository();
export const tenderService = new TenderService(tenderRepository);
export const tenderRouter = createTendersRouter(tenderService);

export * from './tenders.types';
export * from './tenders.dto';
export * from './tenders.service';

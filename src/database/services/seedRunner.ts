import { seedCategories } from '../seed/seedCategories';
import { seedGeo } from '../seed/seedGeo';
import { seedSubscriptionPlans } from '../seed/seedSubscriptionPlans';
import { seedAdmin } from '../seed/seedAdmin';

export const runSeeders = async (): Promise<void> => {
  await seedGeo();
  await seedCategories();
  await seedSubscriptionPlans();
  await seedAdmin();
};

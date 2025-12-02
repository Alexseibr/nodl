import { seedAdmin } from '../seed/seedAdmin';

export const run012_seed_admin_user = async (): Promise<void> => {
  await seedAdmin();
  console.log('Migration 012_seed_admin_user done');
};

export const up = run012_seed_admin_user;

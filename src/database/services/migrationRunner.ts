import { connectDatabase } from '../connection';

import { run001_init_users } from '../migrations/001_init_users';
import { run002_init_geo } from '../migrations/002_init_geo';
import { run003_init_categories } from '../migrations/003_init_categories';
import { run004_init_stores } from '../migrations/004_init_stores';
import { run005_init_ads } from '../migrations/005_init_ads';
import { run006_init_tenders } from '../migrations/006_init_tenders';
import { run007_init_tender_responses } from '../migrations/007_init_tender_responses';
import { run008_init_payments } from '../migrations/008_init_payments';
import { run009_init_subscriptions } from '../migrations/009_init_subscriptions';
import { run010_init_heatmap } from '../migrations/010_init_heatmap';
import { run011_add_indexes } from '../migrations/011_add_indexes';
import { run012_seed_admin_user } from '../migrations/012_seed_admin_user';

export async function runMigrations(): Promise<void> {
  await connectDatabase();

  await run001_init_users();
  await run002_init_geo();
  await run003_init_categories();
  await run004_init_stores();
  await run005_init_ads();
  await run006_init_tenders();
  await run007_init_tender_responses();
  await run008_init_payments();
  await run009_init_subscriptions();
  await run010_init_heatmap();
  await run011_add_indexes();
  await run012_seed_admin_user();

  console.log('All migrations finished');
}

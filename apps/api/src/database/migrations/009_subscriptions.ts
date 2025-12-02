import { SubscriptionModel } from '../../models/Subscription';
import { seedSubscriptions } from '../seed/seedSubscriptions';

export async function up() {
  await SubscriptionModel.createCollection();
  await seedSubscriptions();
}

export async function down() {
  await SubscriptionModel.collection.drop();
}

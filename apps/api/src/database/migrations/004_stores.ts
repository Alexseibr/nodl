import { StoreProfileModel } from '../../models/StoreProfile';

export async function up() {
  await StoreProfileModel.createCollection();
}

export async function down() {
  await StoreProfileModel.collection.drop();
}

import { AdModel } from '../../models/Ad';

export async function up() {
  await AdModel.createCollection();
}

export async function down() {
  await AdModel.collection.drop();
}

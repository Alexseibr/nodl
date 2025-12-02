import { TenderModel } from '../../models/Tender';

export async function up() {
  await TenderModel.createCollection();
}

export async function down() {
  await TenderModel.collection.drop();
}

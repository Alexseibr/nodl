import { TenderResponseModel } from '../../models/TenderResponse';

export async function up() {
  await TenderResponseModel.createCollection();
}

export async function down() {
  await TenderResponseModel.collection.drop();
}

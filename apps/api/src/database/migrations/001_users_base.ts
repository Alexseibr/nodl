import { UserModel } from '../../models/User';

export async function up() {
  await UserModel.createCollection();
}

export async function down() {
  await UserModel.collection.drop();
}

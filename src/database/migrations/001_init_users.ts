import { UserModel } from "../models/User.model";

export async function run001_init_users() {
  // можно добавить любые изменения схемы / data-fix
  await UserModel.createCollection();
  await UserModel.syncIndexes();
  console.log("Migration 001_init_users done");
}


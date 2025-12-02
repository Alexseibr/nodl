import { UserModel } from '../models/User.model';

export const run001_init_users = async (): Promise<void> => {
  await UserModel.createCollection();
  await UserModel.syncIndexes();
  console.log('Migration 001_init_users done');
};

export const up = run001_init_users;

import { UserModel } from '../models/User.model';

export const buildUserIndexes = async (): Promise<void> => {
  await UserModel.collection.createIndex({ phone: 1 }, { unique: true });
  await UserModel.collection.createIndex({ role: 1, country: 1 });
};

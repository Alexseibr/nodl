import { UserModel } from '../database/models/User.model';
import { AppError } from '../utils/errors';

export const UsersService = {
  async getById(id: string) {
    const user = await UserModel.findById(id);
    if (!user) throw AppError.notFound('User not found');
    return user;
  },

  async getMe(id: string) {
    return this.getById(id);
  },

  async updateMe(id: string, payload: any) {
    const user = await UserModel.findById(id);
    if (!user) throw AppError.notFound('User not found');
    Object.assign(user, payload);
    await user.save();
    return user;
  },
};

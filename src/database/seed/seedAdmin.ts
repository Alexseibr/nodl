import { UserModel } from '../models/User.model';

export const seedAdmin = async (): Promise<void> => {
  await UserModel.updateOne(
    { phone: '+375000000000' },
    {
      $set: {
        phone: '+375000000000',
        email: 'admin@nodl.dev',
        name: 'NODL Admin',
        role: 'admin',
        language: 'ru',
        country: 'BY',
      },
    },
    { upsert: true },
  );
};

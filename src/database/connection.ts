import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<typeof mongoose> => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/nodl';
  mongoose.set('strictQuery', true);
  return mongoose.connect(uri);
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
};

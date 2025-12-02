import dotenv from 'dotenv';

dotenv.config();

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/nodl',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  adminPhone: process.env.NODL_ADMIN_PHONE,
};

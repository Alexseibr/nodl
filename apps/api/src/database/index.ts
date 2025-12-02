import mongoose from 'mongoose';
import '../models/User';
import '../models/StoreProfile';
import '../models/Ad';
import '../models/Tender';
import '../models/TenderResponse';
import '../models/Payment';
import '../models/Subscription';
import '../models/Geo';
import '../models/Analytics';
import '../models/Review';
import '../models/Report';
import '../models/Category';
import { ensureIndexes } from './indexes';

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/nodl';

export async function connectDatabase() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  await mongoose.connect(mongoUri, {
    dbName: process.env.MONGO_DB_NAME || 'nodl',
  });

  await ensureIndexes();
  return mongoose.connection;
}

export async function disconnectDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}

export default mongoose;

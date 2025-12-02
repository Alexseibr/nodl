import mongoose from "mongoose";

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://nodl:nodl@mongo:27017/nodl?authSource=admin";

let isConnected = false;

export async function connectDatabase(): Promise<typeof mongoose> {
  if (isConnected) return mongoose;

  mongoose.set("strictQuery", true);

  await mongoose.connect(MONGO_URI);
  isConnected = true;

  return mongoose;
}

export async function disconnectDatabase(): Promise<void> {
  if (!isConnected) return;
  await mongoose.disconnect();
  isConnected = false;
}


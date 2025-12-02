import mongoose from 'mongoose';
import { connectDatabase, disconnectDatabase } from './connection';
import * as models from './models';

export const Database = {
  connect: connectDatabase,
  disconnect: disconnectDatabase,
  models,
  instance: mongoose,
};

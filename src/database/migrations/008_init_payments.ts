import { PaymentModel } from '../models/Payment.model';

export const run008_init_payments = async (): Promise<void> => {
  await PaymentModel.createCollection();
  await PaymentModel.syncIndexes();
  console.log('Migration 008_init_payments done');
};

export const up = run008_init_payments;

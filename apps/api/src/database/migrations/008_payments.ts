import { PaymentModel } from '../../models/Payment';

export async function up() {
  await PaymentModel.createCollection();
}

export async function down() {
  await PaymentModel.collection.drop();
}

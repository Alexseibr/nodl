import { PaymentModel } from '../database/models/Payment.model';
import { AppError } from '../utils/errors';

export const PaymentsService = {
  async create(userId: string, payload: any) {
    const payment = await PaymentModel.create({
      user: userId,
      amount: payload.amount,
      provider: payload.provider || 'manual',
      status: 'pending',
      meta: payload.meta,
    });
    return payment;
  },

  async get(id: string, userId: string) {
    const payment = await PaymentModel.findById(id);
    if (!payment) throw AppError.notFound('Payment not found');
    if (payment.user.toString() !== userId) throw AppError.forbidden();
    return payment;
  },
};

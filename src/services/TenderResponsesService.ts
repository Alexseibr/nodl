import { TenderResponseModel } from '../database/models/TenderResponse.model';
import { buildMultiCurrencyPrice } from '../utils/currency';
import { AppError } from '../utils/errors';

export const TenderResponsesService = {
  async list(tenderId: string) {
    return TenderResponseModel.find({ tender: tenderId }).sort({ createdAt: -1 });
  },

  async create(tenderId: string, payload: any, contractorId: string) {
    const price = payload.price ? buildMultiCurrencyPrice(payload.price.amount, payload.price.currency) : undefined;
    return TenderResponseModel.create({
      tender: tenderId,
      contractor: contractorId,
      message: payload.message,
      price,
    });
  },

  async update(id: string, payload: any, userId: string) {
    const response = await TenderResponseModel.findById(id);
    if (!response) throw AppError.notFound('Tender response not found');
    if (response.contractor.toString() !== userId) throw AppError.forbidden();
    if (payload.price) {
      payload.price = buildMultiCurrencyPrice(payload.price.amount, payload.price.currency);
    }
    Object.assign(response, payload);
    await response.save();
    return response;
  },
};

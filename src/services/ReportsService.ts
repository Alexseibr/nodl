import { ReportModel } from '../database/models/Report.model';
import { AppError } from '../utils/errors';

export const ReportsService = {
  async create(payload: any, userId: string) {
    return ReportModel.create({ reporter: userId, target: payload.targetId, reason: payload.reason, details: payload.details, onModel: payload.onModel || 'Ad' });
  },

  async list() {
    return ReportModel.find({}).sort({ createdAt: -1 });
  },

  async update(id: string, payload: any) {
    const report = await ReportModel.findById(id);
    if (!report) throw AppError.notFound('Report not found');
    Object.assign(report, payload);
    await report.save();
    return report;
  },
};

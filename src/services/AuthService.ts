import crypto from 'crypto';
import { SessionModel } from '../database/models/Session.model';
import { UserModel } from '../database/models/User.model';
import { AppError } from '../utils/errors';
import { RequestContext } from '../types/context';

const phoneCodes = new Map<string, string>();
const SESSION_TTL_DAYS = 30;

const createSession = async (userId: string, userAgent?: string, ip?: string) => {
  const token = crypto.randomBytes(24).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);
  await SessionModel.create({ user: userId, token, expiresAt, userAgent, ip });
  return token;
};

export const AuthService = {
  async initTelegram(payload: any, ctx: RequestContext) {
    if (!payload.telegramId) {
      throw AppError.badRequest('telegramId required');
    }
    const name = payload.firstName || payload.username || 'Telegram User';
    const phone = payload.phone || `tg:${payload.telegramId}`;

    let user = await UserModel.findOne({ telegramId: payload.telegramId });
    if (!user) {
      user = await UserModel.create({
        telegramId: payload.telegramId,
        phone,
        name,
        role: 'customer',
        language: ctx.language,
        country: ctx.countryCode || 'BY',
      });
    }

    const token = await createSession(user.id, payload.userAgent, payload.ip);
    return { token };
  },

  async requestPhoneCode(phone: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    phoneCodes.set(phone, code);
    // eslint-disable-next-line no-console
    console.log(`Phone login code for ${phone}: ${code}`);
    return true;
  },

  async verifyPhoneCode(phone: string, code: string, ctx: RequestContext) {
    const saved = phoneCodes.get(phone);
    if (!saved || saved !== code) {
      throw AppError.badRequest('Invalid code');
    }
    let user = await UserModel.findOne({ phone });
    if (!user) {
      user = await UserModel.create({ phone, name: phone, role: 'customer', language: ctx.language, country: ctx.countryCode || 'BY' });
    }
    const token = await createSession(user.id);
    return { token };
  },

  async me(userId?: string) {
    if (!userId) throw AppError.unauthorized();
    const user = await UserModel.findById(userId);
    if (!user) throw AppError.notFound('User not found');
    return user;
  },

  async logout(token?: string) {
    if (token) {
      await SessionModel.deleteOne({ token });
    }
    return true;
  },
};

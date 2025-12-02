import apiClient from './apiClient';

export const authApi = {
  loginWithTelegram: (payload: Record<string, unknown>) => apiClient.post('/auth/telegram/init', payload).then((r) => r.data.data),
  requestPhoneCode: (phone: string) => apiClient.post('/auth/phone/request-code', { phone }).then((r) => r.data.data),
  loginWithPhone: (phone: string, code: string) => apiClient.post('/auth/phone/verify', { phone, code }).then((r) => r.data.data),
  fetchMe: () => apiClient.get('/auth/me').then((r) => r.data.data),
  logout: () => apiClient.post('/auth/logout').then((r) => r.data.data),
};

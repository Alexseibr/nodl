import apiClient from './apiClient';

export const paymentsApi = {
  create: (payload: Record<string, unknown>) => apiClient.post('/payments/create', payload).then((r) => r.data.data),
  get: (id: string) => apiClient.get(`/payments/${id}`).then((r) => r.data.data),
};

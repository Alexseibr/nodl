import apiClient from './apiClient';

export const storesApi = {
  list: (params?: Record<string, unknown>) => apiClient.get('/stores', { params }).then((r) => r.data.data),
  get: (id: string) => apiClient.get(`/stores/${id}`).then((r) => r.data.data),
  create: (payload: Record<string, unknown>) => apiClient.post('/stores', payload).then((r) => r.data.data),
  update: (id: string, payload: Record<string, unknown>) => apiClient.patch(`/stores/${id}`, payload).then((r) => r.data.data),
};

import apiClient from './apiClient';

export const tendersApi = {
  list: (params?: Record<string, unknown>) => apiClient.get('/tenders', { params }).then((r) => r.data.data),
  get: (id: string) => apiClient.get(`/tenders/${id}`).then((r) => r.data.data),
  create: (payload: Record<string, unknown>) => apiClient.post('/tenders', payload).then((r) => r.data.data),
  respond: (id: string, payload: Record<string, unknown>) => apiClient.post(`/tenders/${id}/responses`, payload).then((r) => r.data.data),
};

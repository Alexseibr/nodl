import apiClient from './apiClient';

export const subscriptionsApi = {
  plans: () => apiClient.get('/subscriptions/plans').then((r) => r.data.data),
  subscribe: (planId: string) => apiClient.post('/subscriptions', { planId }).then((r) => r.data.data),
  mine: () => apiClient.get('/subscriptions/me').then((r) => r.data.data),
  cancel: (id: string) => apiClient.post(`/subscriptions/${id}/cancel`).then((r) => r.data.data),
};

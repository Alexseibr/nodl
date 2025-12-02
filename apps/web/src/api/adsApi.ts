import apiClient from './apiClient';

export const adsApi = {
  searchAds: (params: Record<string, unknown>) => apiClient.get('/ads', { params }).then((r) => r.data.data),
  getAd: (id: string) => apiClient.get(`/ads/${id}`).then((r) => r.data.data),
  createAd: (payload: Record<string, unknown>) => apiClient.post('/ads', payload).then((r) => r.data.data),
  updateAd: (id: string, payload: Record<string, unknown>) => apiClient.patch(`/ads/${id}`, payload).then((r) => r.data.data),
  deleteAd: (id: string) => apiClient.delete(`/ads/${id}`).then((r) => r.data.data),
  viewAd: (id: string) => apiClient.post(`/ads/${id}/view`).then((r) => r.data.data),
  setFavorite: (id: string, value: boolean) =>
    value ? apiClient.post(`/ads/${id}/favorite`).then((r) => r.data.data) : apiClient.delete(`/ads/${id}/favorite`).then((r) => r.data.data),
  bumpAd: (id: string) => apiClient.post(`/ads/${id}/bump`).then((r) => r.data.data),
  highlightAd: (id: string) => apiClient.post(`/ads/${id}/highlight`).then((r) => r.data.data),
};

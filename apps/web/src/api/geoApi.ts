import apiClient from './apiClient';

export const geoApi = {
  countries: () => apiClient.get('/geo/countries').then((r) => r.data.data),
  regions: (countryCode?: string) => apiClient.get('/geo/regions', { params: { countryCode } }).then((r) => r.data.data),
  cities: (regionCode?: string) => apiClient.get('/geo/cities', { params: { regionCode } }).then((r) => r.data.data),
  cityById: (id: string) => apiClient.get(`/geo/cities/${id}`).then((r) => r.data.data),
};

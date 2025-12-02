import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('nodl_token');
  const lang = localStorage.getItem('nodl_lang') || 'ru';
  const country = localStorage.getItem('nodl_country');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['x-lang'] = lang;
  if (country) config.headers['x-country-code'] = country;
  return config;
});

export default apiClient;

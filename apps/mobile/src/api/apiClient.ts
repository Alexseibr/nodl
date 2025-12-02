const baseURL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';
let authToken: string | undefined;

export const setAuthToken = (token?: string) => {
  authToken = token;
};

const request = async (path: string, options: RequestInit = {}) => {
  const headers: Record<string, string> = { ...(options.headers as Record<string, string>) };
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }
  const res = await fetch(`${baseURL}${path}`, { ...options, headers });
  const json = await res.json();
  return json.data;
};

export const adsApi = {
  searchAds: (params: Record<string, unknown>) => request(`/ads?${new URLSearchParams(params as Record<string, string>).toString()}`),
  getAd: (id: string) => request(`/ads/${id}`),
  createAd: (payload: Record<string, unknown>) =>
    request('/ads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }),
};

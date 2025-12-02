import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authApi } from '../api/authApi';

export interface AuthState {
  user?: any;
  token?: string;
  loading: boolean;
  loginWithPhone: (phone: string, code: string) => Promise<void>;
  requestPhoneCode: (phone: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>();
  const [token, setToken] = useState<string | undefined>(localStorage.getItem('nodl_token') || undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMe = async () => {
    if (!token) return;
    try {
      const profile = await authApi.fetchMe();
      setUser(profile);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMe();
  }, [token]);

  const loginWithPhone = async (phone: string, code: string) => {
    setLoading(true);
    try {
      const data = await authApi.loginWithPhone(phone, code);
      setToken(data.token);
      localStorage.setItem('nodl_token', data.token);
      await fetchMe();
    } finally {
      setLoading(false);
    }
  };

  const requestPhoneCode = async (phone: string) => {
    await authApi.requestPhoneCode(phone);
  };

  const logout = async () => {
    await authApi.logout();
    setUser(undefined);
    setToken(undefined);
    localStorage.removeItem('nodl_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, loginWithPhone, requestPhoneCode, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

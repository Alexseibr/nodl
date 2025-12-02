import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { setAuthToken } from '../api/apiClient';

interface AuthState {
  token?: string;
  setToken: (token?: string) => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | undefined>();

  useEffect(() => {
    SecureStore.getItemAsync('nodl_token').then((stored) => {
      if (stored) {
        setTokenState(stored);
        setAuthToken(stored);
      }
    });
  }, []);

  const setToken = async (value?: string) => {
    setTokenState(value);
    setAuthToken(value);
    if (value) await SecureStore.setItemAsync('nodl_token', value);
    else await SecureStore.deleteItemAsync('nodl_token');
  };

  return <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { geoApi } from '../api/geoApi';

interface GeoState {
  countryCode?: string;
  city?: any;
  setCountry: (code?: string) => void;
  setCity: (city?: any) => void;
}

const GeoContext = createContext<GeoState | undefined>(undefined);

export const GeoProvider = ({ children }: { children: ReactNode }) => {
  const [countryCode, setCountryCode] = useState<string | undefined>(localStorage.getItem('nodl_country') || undefined);
  const [city, setCityState] = useState<any>();

  useEffect(() => {
    if (!city && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const nearest = await geoApi.cities();
        setCityState(nearest?.[0]);
      });
    }
  }, [city]);

  const setCountry = (code?: string) => {
    setCountryCode(code);
    if (code) localStorage.setItem('nodl_country', code);
  };

  const setCity = (value?: any) => setCityState(value);

  return <GeoContext.Provider value={{ countryCode, city, setCountry, setCity }}>{children}</GeoContext.Provider>;
};

export const useGeo = () => {
  const ctx = useContext(GeoContext);
  if (!ctx) throw new Error('useGeo must be used within GeoProvider');
  return ctx;
};

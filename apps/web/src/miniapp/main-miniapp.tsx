import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from '../router';
import { AuthProvider } from '../contexts/AuthContext';
import { GeoProvider } from '../contexts/GeoContext';
import { LanguageProvider } from '../contexts/LanguageContext';

const MiniAppRoot = () => {
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
    }
  }, []);

  return (
    <LanguageProvider>
      <GeoProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </GeoProvider>
    </LanguageProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MiniAppRoot />
  </React.StrictMode>,
);

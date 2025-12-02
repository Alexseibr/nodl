import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './router';
import { AuthProvider } from './contexts/AuthContext';
import { GeoProvider } from './contexts/GeoContext';
import { LanguageProvider } from './contexts/LanguageContext';
import './components/layout/layout.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LanguageProvider>
      <GeoProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </GeoProvider>
    </LanguageProvider>
  </React.StrictMode>,
);

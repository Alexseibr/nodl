import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface LanguageState {
  language: 'ru' | 'en' | 'pl';
  setLanguage: (lang: 'ru' | 'en' | 'pl') => void;
}

const LanguageContext = createContext<LanguageState | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<'ru' | 'en' | 'pl'>((localStorage.getItem('nodl_lang') as any) || 'ru');

  useEffect(() => {
    localStorage.setItem('nodl_lang', language);
  }, [language]);

  const setLanguage = (lang: 'ru' | 'en' | 'pl') => setLanguageState(lang);

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};

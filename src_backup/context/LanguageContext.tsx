import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations, type Language, type TranslationKey } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (section: TranslationKey, key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio-language');
    return (saved === 'ar' || saved === 'en') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('portfolio-language', language);
    // Update document direction for RTL support
    const html = document.documentElement;
    html.dir = language === 'ar' ? 'rtl' : 'ltr';
    html.lang = language;
    
    // Apply Arabic font conditionally via a CSS variable or class
    if (language === 'ar') {
      html.style.setProperty('--font-sans', '"Cairo", system-ui, sans-serif');
    } else {
      html.style.setProperty('--font-sans', '"Inter", system-ui, sans-serif');
    }
  }, [language]);

  const t = (section: TranslationKey, key: string): string => {
    try {
      // @ts-ignore
      return translations[language][section][key] || key;
    } catch {
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

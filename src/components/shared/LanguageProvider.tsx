"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchTranslation, getTranslationValue } from '@/lib/translation-service';
import { en } from '@/locales/en';

type Language = 'en' | 'hi' | 'ta' | 'kn' | 'te' | 'bn' | 'mr' | 'ur' | 'gu' | 'or' | 'ml' | 'pa';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => any;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [translations, setTranslations] = useState<any>(en);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial language and translations
  useEffect(() => {
    const init = async () => {
      const savedLang = localStorage.getItem('bharat-rti-lang') as Language;
      const lang = (savedLang && ['en', 'hi', 'ta', 'kn', 'te', 'bn', 'mr', 'ur', 'gu', 'or', 'ml', 'pa'].includes(savedLang)) ? savedLang : 'en';
      
      setLanguageState(lang);
      
      if (lang !== 'en') {
        const data = await fetchTranslation(lang);
        setTranslations(data);
      }
      setIsLoading(false);
    };
    init();
  }, []);

  const setLanguage = async (lang: Language) => {
    setIsLoading(true);
    setLanguageState(lang);
    localStorage.setItem('bharat-rti-lang', lang);
    
    // Fetch new translations
    const data = await fetchTranslation(lang);
    setTranslations(data);
    setIsLoading(false);
  };

  const t = useCallback((path: string) => {
    // 1. Try current translations
    const value = getTranslationValue(translations, path);
    if (value !== undefined) return value;

    // 2. Fallback to English lexicon
    const englishValue = getTranslationValue(en, path);
    if (englishValue !== undefined) return englishValue;

    // 3. Final fallback: the path itself (for debugging/missing keys)
    return path;
  }, [translations]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

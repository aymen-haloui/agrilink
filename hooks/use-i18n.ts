'use client';

import { useEffect, useState } from 'react';
import i18next from 'i18next';
import { useTranslation as useTranslationOriginal } from 'react-i18next';

export function useI18n() {
  const { i18n } = useTranslationOriginal();
  const [isRTL, setIsRTL] = useState(false);
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    const currentLang = i18n.language || 'en';
    setLanguage(currentLang);
    setIsRTL(currentLang === 'ar');
    
    // Set HTML dir attribute for RTL languages
    if (typeof document !== 'undefined') {
      document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = currentLang;
    }
  }, [i18n.language]);

  const changeLanguage = async (lang: string) => {
    await i18n.changeLanguage(lang);
    setLanguage(lang);
    setIsRTL(lang === 'ar');
    
    if (typeof document !== 'undefined') {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  };

  return {
    language,
    isRTL,
    changeLanguage,
    t: useTranslationOriginal,
  };
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DistrictInfo, Language } from '../types';
import { getTranslation, TRANSLATIONS, TranslationDictionary, CategoryTranslation } from '../utils/translations';
import { getLocalizedDistrictName } from '../utils/districtNames';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
  isTamil: boolean;
  isEnglish: boolean;
  isHindi: boolean;
  isTelugu: boolean;
  isBengali: boolean;
  getDistrictName: (district: DistrictInfo) => string;
  getCategory: (categoryId: string) => CategoryTranslation;
  translate: (enStr: string, taStr?: string, hiStr?: string, teStr?: string, bnStr?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LOCAL_STORAGE_LANG_KEY = 'tn_agri_preferred_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_LANG_KEY);
      if (saved && (saved === 'en' || saved === 'ta' || saved === 'hi' || saved === 'te' || saved === 'bn')) {
        return saved as Language;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LOCAL_STORAGE_LANG_KEY, lang);
    } catch {
      // ignore
    }
  };

  const t = getTranslation(language);

  const isTamil = language === 'ta';
  const isEnglish = language === 'en';
  const isHindi = language === 'hi';
  const isTelugu = language === 'te';
  const isBengali = language === 'bn';

  const getDistrictName = (district: DistrictInfo): string => {
    return getLocalizedDistrictName(district, language);
  };

  const getCategory = (categoryId: string): CategoryTranslation => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    if (dict.categories && dict.categories[categoryId]) {
      return dict.categories[categoryId];
    }
    return (
      TRANSLATIONS.en.categories[categoryId] || {
        title: categoryId,
        tag: 'Module',
        desc: '',
      }
    );
  };

  const translate = (enStr: string, taStr?: string, hiStr?: string, teStr?: string, bnStr?: string): string => {
    if (language === 'ta' && taStr) return taStr;
    if (language === 'hi' && hiStr) return hiStr;
    if (language === 'te' && teStr) return teStr;
    if (language === 'bn' && bnStr) return bnStr;
    return enStr;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isTamil,
        isEnglish,
        isHindi,
        isTelugu,
        isBengali,
        getDistrictName,
        getCategory,
        translate,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback safe default if used outside Provider
    const fallbackT = getTranslation('en');
    return {
      language: 'en',
      setLanguage: () => {},
      t: fallbackT,
      isTamil: false,
      isEnglish: true,
      isHindi: false,
      isTelugu: false,
      isBengali: false,
      getDistrictName: (d: DistrictInfo) => d.nameEn,
      getCategory: (id: string) => fallbackT.categories[id] || { title: id, tag: '', desc: '' },
      translate: (en: string) => en,
    };
  }
  return context;
};

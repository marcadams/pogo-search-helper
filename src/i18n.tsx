import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { translations } from './i18n/index';

export const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
] as const;

export type LangCode = typeof LANGUAGES[number]['code'];

function detectLanguage(): LangCode {
  const stored = localStorage.getItem('pogo-lang');
  if (stored && translations[stored]) return stored as LangCode;
  const browserLang = navigator.language.split('-')[0];
  if (translations[browserLang]) return browserLang as LangCode;
  return 'en';
}

type I18nContextType = {
  lang: LangCode;
  setLang: (code: LangCode) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(detectLanguage);

  function setLang(code: LangCode) {
    setLangState(code);
    localStorage.setItem('pogo-lang', code);
    document.documentElement.lang = code;
  }

  useEffect(() => {
    document.documentElement.lang = lang;
  }, []);

  function t(key: string): string {
    return translations[lang]?.[key] ?? translations.en[key] ?? key;
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

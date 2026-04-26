import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { dictionaries, Lang, TranslationKey } from './dictionaries';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ru',
  setLang: () => {},
  t: (key) => key,
});

export const useLang = () => useContext(LanguageContext);

function format(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('lang') as Lang | null;
    if (saved && dictionaries[saved]) return saved;
    return 'ru';
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => setLangState(next);

  const t = (key: TranslationKey, vars?: Record<string, string | number>) => {
    const dict = dictionaries[lang] ?? dictionaries.ru;
    const fallback = dictionaries.ru[key] ?? key;
    return format(dict[key] ?? fallback, vars);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

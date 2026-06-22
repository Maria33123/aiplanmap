"use client";

import { translations, type Locale, type Translation } from "@/lib/i18n";
import { createContext, useContext, useEffect, type ReactNode } from "react";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translation;
};

type PageMetaByLocale = Record<
  Locale,
  {
    title: string;
    description: string;
  }
>;

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  initialLocale = "en",
}: {
  children: ReactNode;
  initialLocale?: Locale;
  metaByLocale?: PageMetaByLocale;
}) {
  const value: LanguageContextValue = {
    locale: initialLocale,
    setLocale: () => {},
    t: translations[initialLocale],
  };

  useEffect(() => {
    document.documentElement.lang = initialLocale === "zh" ? "zh-CN" : "en";
  }, [initialLocale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}

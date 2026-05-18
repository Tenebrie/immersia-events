import fiTranslations from '../locales/fi.json';
import enTranslations from '../locales/en.json';

export type Locale = 'fi' | 'en';

type TranslationData = typeof fiTranslations;

const translations: Record<Locale, TranslationData> = {
  fi: fiTranslations,
  en: enTranslations as unknown as TranslationData,
};

export function t(locale: Locale, key: string): string {
  const keys = key.split('.');
  let obj: unknown = translations[locale] ?? translations.fi;
  for (const k of keys) {
    if (typeof obj !== 'object' || obj === null) return key;
    obj = (obj as Record<string, unknown>)[k];
  }
  return typeof obj === 'string' ? obj : key;
}

export function tArray(locale: Locale, key: string): string[] {
  const keys = key.split('.');
  let obj: unknown = translations[locale] ?? translations.fi;
  for (const k of keys) {
    if (typeof obj !== 'object' || obj === null) return [];
    obj = (obj as Record<string, unknown>)[k];
  }
  return Array.isArray(obj) ? obj.filter((item): item is string => typeof item === 'string') : [];
}

export function getAlternatePath(locale: Locale, pathname: string): string {
  if (locale === 'fi') {
    return `/en${pathname === '/' ? '' : pathname}`;
  }
  const stripped = pathname.replace(/^\/en/, '') || '/';
  return stripped;
}

export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'fi') return clean;
  return `/en${clean === '/' ? '' : clean}`;
}

export function formatEventDate(dateStr: string, locale: Locale): string {
  if (!dateStr || dateStr.startsWith('TBD') || dateStr.startsWith('[')) return dateStr;
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return new Intl.DateTimeFormat(locale === 'fi' ? 'fi-FI' : 'en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  } catch {
    return dateStr;
  }
}

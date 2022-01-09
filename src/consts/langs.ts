import { Lang } from '~/types';

export const langs = ['en', 'bg'] as const;
export const systemLang: Lang = navigator.language.split('-')[0] as Lang;
export const defaultLang: Lang = langs.includes(systemLang) ? systemLang : 'en';

import { ui, defaultLang } from './ui';


type DeepLeafKeys<T, Prefix extends string = ''> = T extends object
? {
    [K in keyof T & string]: DeepLeafKeys<T[K], Prefix extends '' ? `${Prefix}${K}` : `${Prefix}.${K}` >;
  }[keyof T & string]
: Prefix;


export function getLangFromUrl(url: URL | string) {

  if(typeof url === 'string') {
    url = new URL(url);
  }
  
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

const getKeyByString = (obj: any, str: string): string => {
  return str.split('.').reduce((acc, key) => acc[key], obj);
};

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: DeepLeafKeys<typeof ui[typeof defaultLang]>) {
    return getKeyByString(ui, `${lang}.${key}`);
  }
}
export interface LocalizedString {
  ru?: string;
  by?: string;
  pl?: string;
  en?: string;
}

export const createLocalizedString = (defaults: LocalizedString = {}): LocalizedString => ({
  ru: defaults.ru ?? '',
  by: defaults.by ?? '',
  pl: defaults.pl ?? '',
  en: defaults.en ?? '',
});

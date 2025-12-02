import ru from '../../i18n/ru.json';
import en from '../../i18n/en.json';
import pl from '../../i18n/pl.json';
import { useLanguage } from '../../contexts/LanguageContext';

const dictionaries: Record<string, Record<string, string>> = { ru, en, pl };

export const T = ({ id }: { id: string }) => {
  const { language } = useLanguage();
  const text = dictionaries[language]?.[id] || id;
  return <>{text}</>;
};

export const translations = {
  ru: {
    common: {
      welcome: 'Добро пожаловать в NODL',
      nearbyOrders: 'Заказы рядом',
      nearbyMasters: 'Мастера рядом'
    }
  },
  en: {
    common: {
      welcome: 'Welcome to NODL',
      nearbyOrders: 'Orders nearby',
      nearbyMasters: 'Masters nearby'
    }
  },
  pl: {
    common: {
      welcome: 'Witamy w NODL',
      nearbyOrders: 'Zlecenia w pobliżu',
      nearbyMasters: 'Mistrzowie w pobliżu'
    }
  }
};

export type SupportedLocale = keyof typeof translations;

export function getTranslation(locale: SupportedLocale, namespace: keyof typeof translations['ru']) {
  return translations[locale][namespace];
}

export const translations = {
  ru: {
    common: {
      welcome: 'Добро пожаловать в NODL',
      nearbyOrders: 'Заказы рядом',
      nearbyMasters: 'Мастера рядом'
    },
    monetization: require('./ru/monetization.json')
  },
  en: {
    common: {
      welcome: 'Welcome to NODL',
      nearbyOrders: 'Orders nearby',
      nearbyMasters: 'Masters nearby'
    },
    monetization: require('./en/monetization.json')
  },
  pl: {
    common: {
      welcome: 'Witamy w NODL',
      nearbyOrders: 'Zlecenia w pobliżu',
      nearbyMasters: 'Mistrzowie w pobliżu'
    },
    monetization: require('./pl/monetization.json')
  }
};

export type SupportedLocale = keyof typeof translations;

export function getTranslation(locale: SupportedLocale, namespace: keyof typeof translations['ru']) {
  return translations[locale][namespace];
}

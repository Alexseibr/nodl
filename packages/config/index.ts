export const config = {
  api: {
    port: Number(process.env.API_PORT || 3000),
    jwtSecret: process.env.JWT_SECRET || 'development-secret',
    defaultLocale: process.env.DEFAULT_LOCALE || 'ru',
  },
  db: {
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/nodl',
  },
  cache: {
    redisHost: process.env.REDIS_HOST || 'localhost',
    redisPort: Number(process.env.REDIS_PORT || 6379),
  },
  currency: {
    baseCurrency: process.env.BASE_CURRENCY || 'EUR',
    supported: (process.env.SUPPORTED_CURRENCIES || 'EUR,BYN,RUB,PLN').split(','),
    ratesUrl: process.env.CURRENCY_API_URL || '',
  },
};

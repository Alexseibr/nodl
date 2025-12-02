import { createApp } from './app';
import { connectDatabase } from './database/connection';
import { config } from './config/env';

const bootstrap = async () => {
  await connectDatabase();
  const app = createApp();
  app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`NODL API listening on port ${config.port}`);
  });
};

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server', err);
  process.exit(1);
});

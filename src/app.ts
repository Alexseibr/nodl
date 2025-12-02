import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { contextMiddleware } from './middlewares/context.middleware';
import { authMiddleware } from './middlewares/auth.middleware';
import { apiRouter } from './routes';
import { errorMiddleware } from './middlewares/error.middleware';

export const createApp = (): express.Express => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(contextMiddleware);
  app.use(authMiddleware);

  app.use('/api', apiRouter);

  app.use(errorMiddleware);

  return app;
};

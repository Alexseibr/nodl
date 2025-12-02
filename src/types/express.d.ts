import { RequestContext } from './context';

declare module 'express-serve-static-core' {
  interface Request {
    ctx: RequestContext;
  }
}

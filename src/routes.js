import { Router } from 'express';

import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

const bruteStore = new BruteRedis({
  host: process.env.HOST_REDIS,
  port: process.env.PORT_REDIS,
});

const bruteForce = new Brute(bruteStore, {
  freeRetries: 5,
  minWait: 5 * 60 * 1000, // 5 minutes
  maxWait: 60 * 60 * 1000, // 1 hour,
  lifetime: 24 * 60 * 60, // 1 day (seconds not milliseconds)
});

routes.post('/sessions', bruteForce.prevent, SessionController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

export default routes;

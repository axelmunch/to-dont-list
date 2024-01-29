import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import routes from './routes/index.js';

const app = Fastify({
  logger: true,
});

// CORS
await app.register(fastifyCors);

// Routes
routes.forEach((route) => {
  app.route(route);
});

export default app;

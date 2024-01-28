import Fastify from 'fastify';
import routes from './routes/index.js';

const app = Fastify({
  logger: true,
});

// Routes
routes.forEach((route) => {
  app.route(route);
});

export default app;

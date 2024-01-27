import Fastify from 'fastify';

const app = Fastify({
  logger: true,
});

// Routes
app.get('/', async function handler(_request, _reply) {
  return "To-don't list";
});

export default app;

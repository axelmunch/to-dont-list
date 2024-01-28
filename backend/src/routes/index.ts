import type { RouteOptions, HTTPMethods } from 'fastify';

const routes: RouteOptions[] = [
  {
    method: 'GET' as HTTPMethods,
    url: '/',
    handler: (_request, reply) => {
      return reply.send("To-don't list");
    },
  },
];

export default routes;

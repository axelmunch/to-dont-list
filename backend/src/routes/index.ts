import type { RouteOptions, HTTPMethods } from 'fastify';
import tagRoutes from './tagRoutes.js';
import taskRoutes from './taskRoutes.js';

const routes: RouteOptions[] = [
  {
    method: 'GET' as HTTPMethods,
    url: '/',
    handler: (_request, _reply) => {
      return "To-don't list";
    },
  },
  ...tagRoutes,
  ...taskRoutes,
];

export default routes;

import type { RouteOptions, HTTPMethods } from 'fastify';
import tagRoutes from './tagRoutes.js';
import taskRoutes from './taskRoutes.js';
import taskTagRoutes from './taskTagRoutes.js';

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
  ...taskTagRoutes,
];

export default routes;

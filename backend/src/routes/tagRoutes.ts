import type { RouteOptions, HTTPMethods } from 'fastify';
import * as controller from '../controllers/tagController.js';

const prefix = '/tags';

const tagRoutes: RouteOptions[] = [
  {
    method: 'GET' as HTTPMethods,
    url: prefix,
    handler: controller.getAll,
  },
  {
    method: 'GET' as HTTPMethods,
    url: `${prefix}/:id`,
    handler: controller.getOne,
  },
  {
    method: 'POST' as HTTPMethods,
    url: prefix,
    handler: controller.create,
  },
  {
    method: 'PUT' as HTTPMethods,
    url: `${prefix}/:id`,
    handler: controller.update,
  },
  {
    method: 'DELETE' as HTTPMethods,
    url: `${prefix}/:id`,
    handler: controller.remove,
  },
];

export default tagRoutes;

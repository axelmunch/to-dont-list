import type { RouteOptions, HTTPMethods } from 'fastify';
import * as controller from '../controllers/taskTagController.js';

const prefix = '/taskTag';
const tagPrefix = '/tags';
const taskPrefix = '/tasks';

const taskTagRoutes: RouteOptions[] = [
  {
    method: 'GET' as HTTPMethods,
    url: prefix,
    handler: controller.getAll,
  },
  {
    method: 'GET' as HTTPMethods,
    url: `${tagPrefix}/:id/tasks`,
    handler: controller.getTasks,
  },
  {
    method: 'POST' as HTTPMethods,
    url: `${tagPrefix}/:id/tasks/:taskId`,
    handler: controller.addTask,
  },
  {
    method: 'DELETE' as HTTPMethods,
    url: `${tagPrefix}/:id/tasks/:taskId`,
    handler: controller.removeTask,
  },
  {
    method: 'GET' as HTTPMethods,
    url: `${taskPrefix}/:id/tags`,
    handler: controller.getTags,
  },
  {
    method: 'POST' as HTTPMethods,
    url: `${taskPrefix}/:id/tags/:tagId`,
    handler: controller.addTag,
  },
  {
    method: 'DELETE' as HTTPMethods,
    url: `${taskPrefix}/:id/tags/:tagId`,
    handler: controller.removeTag,
  },
];

export default taskTagRoutes;

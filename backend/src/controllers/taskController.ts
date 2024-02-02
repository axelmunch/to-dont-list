import type { RouteHandlerMethod, FastifyRequest } from 'fastify';
import { Task, type TaskType } from '../models/index.js';
import { validateTask as validate } from '../models/Task.js';

export const getAll: RouteHandlerMethod = async (_request, _reply) => {
  return await Task.findAll({ order: [['createdAt', 'DESC']] });
};

export const getOne: RouteHandlerMethod = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  _reply
) => {
  return await Task.findByPk(request.params.id);
};

export const create: RouteHandlerMethod = async (
  request: FastifyRequest<{ Body: TaskType }>,
  reply
) => {
  if (!validate(request.body)) {
    return await reply.status(400).send('Invalid task');
  }

  return await Task.create({ ...request.body });
};

export const update: RouteHandlerMethod = async (
  request: FastifyRequest<{ Params: { id: string }; Body: TaskType }>,
  reply
) => {
  if (!validate(request.body)) {
    return await reply.status(400).send('Invalid task');
  }

  return await Task.update(
    { ...request.body },
    { where: { id: request.params.id } }
  );
};

export const remove: RouteHandlerMethod = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  _reply
) => {
  return await Task.destroy({ where: { id: request.params.id } });
};

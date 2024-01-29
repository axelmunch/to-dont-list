import { TaskTag } from '../models/index.js';
import type { RouteHandlerMethod, FastifyRequest } from 'fastify';

export const getAll: RouteHandlerMethod = async (_request, _reply) => {
  return await TaskTag.findAll({ order: [['createdAt', 'ASC']] });
};

export const getTasks: RouteHandlerMethod = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  _reply
) => {
  return await TaskTag.findAll({
    where: { TagId: request.params.id },
  });
};

export const addTask: RouteHandlerMethod = async (
  request: FastifyRequest<{ Params: { id: string; taskId: string } }>,
  _reply
) => {
  return await TaskTag.create({
    TagId: request.params.id,
    TaskId: request.params.taskId,
  });
};

export const removeTask: RouteHandlerMethod = async (
  request: FastifyRequest<{ Params: { id: string; taskId: string } }>,
  _reply
) => {
  return await TaskTag.destroy({
    where: { TagId: request.params.id, TaskId: request.params.taskId },
  });
};

export const getTags: RouteHandlerMethod = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  _reply
) => {
  return await TaskTag.findAll({
    where: { TaskId: request.params.id },
  });
};

export const addTag: RouteHandlerMethod = async (
  request: FastifyRequest<{ Params: { id: string; tagId: string } }>,
  _reply
) => {
  return await TaskTag.create({
    TaskId: request.params.id,
    TagId: request.params.tagId,
  });
};

export const removeTag: RouteHandlerMethod = async (
  request: FastifyRequest<{ Params: { id: string; tagId: string } }>,
  _reply
) => {
  return await TaskTag.destroy({
    where: { TaskId: request.params.id, TagId: request.params.tagId },
  });
};

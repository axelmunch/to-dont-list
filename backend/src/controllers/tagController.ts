import type { RouteHandlerMethod, FastifyRequest } from 'fastify';
import { Tag, type TagType } from '../models/index.js';
import { validateTag as validate } from '../models/Tag.js';

export const getAll: RouteHandlerMethod = async (_request, _reply) => {
  return await Tag.findAll({ order: [['createdAt', 'DESC']] });
};

export const getOne: RouteHandlerMethod = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  _reply
) => {
  return await Tag.findByPk(request.params.id);
};

export const create: RouteHandlerMethod = async (
  request: FastifyRequest<{ Body: TagType }>,
  reply
) => {
  if (!validate(request.body)) {
    return await reply.status(400).send('Invalid tag');
  }

  return await Tag.create({ ...request.body });
};

export const update: RouteHandlerMethod = async (
  request: FastifyRequest<{ Params: { id: string }; Body: TagType }>,
  reply
) => {
  if (!validate(request.body)) {
    return await reply.status(400).send('Invalid tag');
  }

  return await Tag.update(
    { ...request.body },
    { where: { id: request.params.id } }
  );
};

export const remove: RouteHandlerMethod = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  _reply
) => {
  return await Tag.destroy({ where: { id: request.params.id } });
};

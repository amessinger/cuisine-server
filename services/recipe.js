import { ServiceError, ResourceDoesNotExistError, IncorrectPayloadError, filterPayload } from '../utils/services.js';
import Recipe from '../models/recipe.js';

export async function findAll() {
  try {
    return await Recipe.findAll();
  } catch (error) {
    throw new ServiceError(error);
  }
}

export async function find(id) {
  const resource = await Recipe.findByPk(id);
  if (resource) {
    return await Recipe.findByPk(id);
  } else {
    throw new ResourceDoesNotExistError();
  }
}

export async function create(data) {
  try {
    return await Recipe.create(data);
  } catch (error) {
    throw new ServiceError(error);
  }
}

export async function update(id, payload) {
  const filteredPayload = filterPayload(Recipe, payload);
  if (Object.keys(filteredPayload).length !== Recipe.publicAttributes.length) {
    throw new IncorrectPayloadError();
  }
  try {
    return await Recipe.update(filteredPayload, { where: { id } });
  } catch (error) {
    throw new ServiceError(error);
  }
}

export async function patch(id, data) {
  try {
    return await Recipe.update(data, { where: { id } });
  } catch (error) {
    throw new ServiceError(error);
  }
}

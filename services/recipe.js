import Recipe from '../models/recipe.js';

export async function findAll() {
  return await Recipe.findAll();
}

export async function find(id) {
  return await Recipe.findByPk(id);
}

export async function create(data) {
  return await Recipe.create(data);
}

export async function update(id, data) {
  return await Recipe.update(data, { where: { id } });
}

import pkg from 'sequelize';
const { Model, DataTypes } = pkg;

export default class Recipe extends Model {}

export function init(sequelize) {
  Recipe.init({
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  }, { sequelize, modelName: 'recipe' });

  return Recipe;
}

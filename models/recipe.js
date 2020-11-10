import pkg from 'sequelize';
const { Model, DataTypes } = pkg;

export default class Recipe extends Model {}

export function init(sequelize) {
  Recipe.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, { sequelize, modelName: 'recipe' });

  return Recipe;
}

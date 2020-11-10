import pkg from 'sequelize';
const { Model, DataTypes } = pkg;

export default class Recipe extends Model {
  static get privateAttributes() {
    return [
      'id',
      'createdAt',
      'updatedAt'
    ];
  }
  static get publicAttributes() {
    return Object.keys(this.tableAttributes).filter(attribute => !this.privateAttributes.includes(attribute));
  }
}

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

const { env } = process;

import path from 'path';

import pkg from 'sequelize';
const { Sequelize } = pkg;

const sequelize = new Sequelize(
  env.POSTGRES_DB,
  env.POSTGRES_USER,
  env.POSTGRES_PASSWORD,
  {
    host: env.POSTGRES_HOST,
    dialect: 'postgres',
    logging: false
  }
);

async function loadResourceModel(sequelize, resourceName) {
  try {
    const { init } = await import(path.join(process.cwd(), 'models', `${resourceName}.js`));
    init(sequelize);
  } catch (error) {
    console.log(`could not load model for resource '${resourceName}'`, error);
  }
}

loadResourceModel(sequelize, 'recipe');

export default sequelize;
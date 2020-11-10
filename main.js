// CONFIG
import dotenv from 'dotenv';
dotenv.config();
const { env } = process;

// DATABASE
import pkg from 'sequelize';
const { Sequelize } = pkg;

const sequelize = new Sequelize(
  env.POSTGRES_DB,
  env.POSTGRES_USER,
  env.POSTGRES_PASSWORD, 
  {
    host: env.POSTGRES_HOST,
    dialect: 'postgres'
  }
);

async function loadResourceModel(resourceName) {
  try {
    const { init } = await import(`./models/${resourceName}.js`);
    init(sequelize);
  } catch (error) {
    console.log(`could not load model for resource '${resourceName}'`, error);
  }
}

loadResourceModel('recipe');

async function testDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testDatabase();

(async () => {
  await sequelize.sync({force: true});
  await sequelize.models.recipe.sync({ force: true });
  await sequelize.models.recipe.create({
    title: 'Brownie',
    body: 'some recipe'
  });
})();

// SERVER
import express from 'express';
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello World!');
});

async function loadResourceRoutes(resourceName) {
  try {
    const { default: routes } = await import(`./routes/${resourceName}.js`);
    Object.keys(routes).forEach(entry => {
      const [method, path] = entry.split(' ');
      server[method.toLowerCase()](path, routes[entry]);
    });
  } catch (error) {
    console.log(`could not road routes for resource '${resourceName}'`, error);
  }
}

loadResourceRoutes('recipe');

server.listen(env.SERVER_PORT, env.SERVER_HOST, () => {
  console.log(`Server listening at http://${env.SERVER_HOST}:${env.SERVER_PORT}`);
});

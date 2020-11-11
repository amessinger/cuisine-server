import path from 'path';
import express from 'express';

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('ok');
});

async function loadResourceRoutes(server, resourceName) {
  try {
    const { default: routes } = await import(path.join(process.cwd(), 'routes', `${resourceName}.js`));
    Object.keys(routes).forEach(entry => {
      const [method, path] = entry.split(' ');
      server[method.toLowerCase()](path, routes[entry]);
    });
  } catch (error) {
    console.log(`could not load routes for resource '${resourceName}'`, error);
  }
}

loadResourceRoutes(server, 'recipe');

export default server;
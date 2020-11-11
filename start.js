import { server } from './main.js';

const { env } = process;

server.listen(env.SERVER_PORT, env.SERVER_HOST, () => {
  console.log(`Server listening at http://${env.SERVER_HOST}:${env.SERVER_PORT}`);
});
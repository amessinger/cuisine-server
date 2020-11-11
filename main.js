// CONFIG
import dotenv from 'dotenv';
dotenv.config();

// DATABASE
import database from './database.js';

// SERVER
import server from './server.js';

export { server, database };

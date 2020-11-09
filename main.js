// CONFIG
const { env } = process

// DATABASE
import pkg from 'sequelize'
const { Sequelize } = pkg

const sequelize = new Sequelize(
  env.POSTGRES_DB,
  env.POSTGRES_USER,
  env.POSTGRES_PASSWORD, 
  {
    host: env.POSTGRES_HOST,
    dialect: 'postgres'
  }
);

async function testDatabase() {
  try {
    await sequelize.authenticate()
    console.log('Connection to the database has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

testDatabase()

// SERVER
import express from 'express'
const server = express()

server.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(env.SERVER_PORT, env.SERVER_HOST, () => {
  console.log(`Server listening at http://${env.SERVER_HOST}:${env.SERVER_PORT}`)
})

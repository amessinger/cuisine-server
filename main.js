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
    console.log('Connection has been established successfully.')
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

server.listen(env.SERVICE_PORT, () => {
  console.log(`Example server listening at http://localhost:${env.SERVER_PORT}`)
})

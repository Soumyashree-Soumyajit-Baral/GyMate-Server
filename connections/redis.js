require("dotenv").config(); 
const { Redis } = require('ioredis')

//const client = new Redis()                 // it will hit redis server by default 6379

const client = new Redis({
    host: process.env.REDIS_DB_HOST,             // Redis server hostname
    port: process.env.REDIS_DB_PORT,               // Redis server port (default is 6379)
    password: process.env.REDIS_DB_PASSWORD          // Set the password here
  });

module.exports = client
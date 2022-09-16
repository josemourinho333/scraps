require('dotenv').config();
const pg = require('pg');
const Pool = pg.Pool;

let config;
if (process.env.DATABASE_URL) {
  config = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
} else {
  config = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    databse: process.env.POSTGRES_DB
  }
};

const db = new Pool(config);

db.connect(() => {
  console.log('connected to database!');
});

module.exports = db;


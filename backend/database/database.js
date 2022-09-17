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
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    databse: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  }
};

const db = new Pool(config);

db.connect(() => {
  console.log(`connected to database!`);
});

module.exports = db;


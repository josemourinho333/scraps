require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');

const cors = require('cors');
const db = require('./database/database');
const scrapeData = require('./fetch');

const listingRoute = require('./routes/listings');
const settingsRoute = require('./routes/settings');
const medianRoute = require('./routes/median');

// port and express init
const port = process.env.PORT || 8080;
const app = express();

// mailer
// const cp = require('child_process');
// cp.fork(__dirname + '/mailer.js');

// cors config
const corsOptions = {
  origin: 'http://localhost:3000/',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  preflightContinue: false,
  credentials: true,
  optionsSuccessStatus: 204,
};

// middleware
app.use(cors(corsOptions));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// routes
app.use('/api', listingRoute(db));
app.use('/api', settingsRoute(db));
app.use('/api', medianRoute(db));

// scraping data
scrapeData(db);

app.listen(port, () => console.log(`Server running on ${port}`));
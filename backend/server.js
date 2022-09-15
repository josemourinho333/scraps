const PORT = 8080;
const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const app = express();


app.listen(PORT, () => console.log(`Server running on ${PORT}`));
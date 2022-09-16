const express = require('express');
const bodyparser = require('body-parser');
const cheerio = require('cheerio');
const axios = require('axios');
const db = require('./database/database');

const port = process.env.PORT || 8080;

const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// helper to organize listings in an array
const organizeData = (data) => {
  const listings = [];
  const html = data.data;
  const $ = cheerio.load(html);
  $('.result-row', html).each(function() {
    const currentElement = $(this);
    const id = currentElement.attr('data-pid');
    const title = currentElement.find('.result-title').text();
    const link = currentElement.children('.result-image').attr('href');
    const images = !currentElement.find('.result-image').attr('data-ids')
      ? []
      : currentElement.find('.result-image').attr('data-ids').split(',').map((ids) => {
        return `https://images.craigslist.org/${ids.slice(2)}_300x300.jpg`;
      })
    ;
    const price = currentElement.children('.result-info').find('.result-price').text();
    const date = currentElement.children('.result-info').find('.result-date').attr('datetime');
    const location = currentElement.children('.result-info').find('.result-hood').text();
    listings.push({
      id, title, link, images, price, date, location
    });
  })

  return listings;
};

// fetching logic
Promise.all([
  axios.get('https://vancouver.craigslist.org/search/sya?query=macbook&s=0&searchNearby=1'),
  axios.get('https://vancouver.craigslist.org/search/sya?query=macbook&s=120&searchNearby=1'),
  axios.get('https://vancouver.craigslist.org/search/sya?query=macbook&s=240&searchNearby=1')
])
.then((all) => {
  const listings = [...organizeData(all[0]), ...organizeData(all[1]), ...organizeData(all[2])];
  // wrtite to db here.
  console.log('all', listings.length);
})
.catch(err => console.log('err', err));

app.listen(port, () => console.log(`Server running on ${port}`));
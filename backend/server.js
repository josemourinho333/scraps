const express = require('express');
const bodyparser = require('body-parser');
const cheerio = require('cheerio');
const axios = require('axios');
const cors = require('cors');
const db = require('./database/database');
const listingRoute = require('./routes/listings');

// port and express init
const port = process.env.PORT || 8080;
const app = express();

// middleware
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// routes
app.use('/api', listingRoute(db));

let count = 0;
const listings = [];

const getListings = (count) => {
  return axios.get(`https://vancouver.craigslist.org/search/sya?query=macbook&s=${count}&searchNearby=1`)
    .then((res) => {
      const html = res.data;
      const $ = cheerio.load(html);
      const stopElement = $('.content').find('#train').html();
      if (!stopElement) {
        console.log('helo',);
        $('.result-row', html).each(function() {
          const currentElement = $(this);
          const id = Number(currentElement.attr('data-pid'));
          const title = currentElement.find('.result-title').text();
          const link = currentElement.children('.result-image').attr('href');
          const images = !currentElement.find('.result-image').attr('data-ids')
            ? []
            : currentElement.find('.result-image').attr('data-ids').split(',').map((ids) => {
              return `https://images.craigslist.org/${ids.slice(2)}_300x300.jpg`;
            })
          ;
          const price = Number(currentElement.children('.result-info').find('.result-price').text().slice(1));
          const date = currentElement.children('.result-info').find('.result-date').attr('datetime');
          const location = currentElement.children('.result-info').find('.result-hood').text();
          listings.push({
            id, title, link, images, price, date, location
          });
        });
        return getListings(count + 120);
      } else {
        console.log('listings', listings.length);
        return listings;
      }
    })
    .catch((err) => console.log('err', err));
};

getListings(count);

app.listen(port, () => console.log(`Server running on ${port}`));
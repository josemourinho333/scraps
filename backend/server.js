require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const cheerio = require('cheerio');
const axios = require('axios');
const cors = require('cors');
const db = require('./database/database');
const listingRoute = require('./routes/listings');
const { stringify } = require('querystring');

// port and express init
const port = process.env.PORT || 8080;
const app = express();

// middleware
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// routes
app.use('/api', listingRoute(db));


// fetching logic
let count = 0;
const listings = [];

// will need to be in db
const unwanted = {
  years: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'],
  words: ['imac', '$1']
}

axios.get(process.env.CRAIGSLIST_URL)
  .then((res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    let limit = 3;
    $('.result-row', html).each(function(index) {
      if (index < limit) {
        const currentElement = $(this);
        const title = currentElement.find('.result-title').text().toLowerCase();
        const condition = (element) => title.includes(element);
        if (!unwanted.years.some(condition) && !unwanted.words.some(condition)) {
          const id = Number(currentElement.attr('data-pid'));
          const price = Number(currentElement.children('.result-info').find('.result-price').text().slice(1));
          const images = !currentElement.find('.result-image').attr('data-ids')
          ? []
          : currentElement.find('.result-image').attr('data-ids').split(',').map((ids) => {
            return `https://images.craigslist.org/${ids.slice(2)}_300x300.jpg`;
          })
        ;
          const date = currentElement.children('.result-info').find('.result-date').attr('datetime');
          const location = currentElement.children('.result-info').find('.result-hood').text();
          const link = currentElement.children('.result-image').attr('href');
          setTimeout(() => {
            axios.get(link).then((res) => {
              const html = res.data;
              const $ = cheerio.load(html);
              console.log('id', id);
              console.log('price', price);
              console.log('date', date);
              console.log('images', images);
              console.log('location', location);
              console.log('post title', $('.body', html).find('.postingtitle').text());
              console.log('desc', $('.body', html).find('#postingbody').not($('.body', html).find('#postingbody').children()).text().trim());
              console.log('condition', $('.body', html).find('.attrgroup').children('span:first-child').children('b').text());
            })
          }, index * 1000);
        }
      }
    })
  })
  .catch((err) => console.log('err', err));

// const getListings = (count) => {
//   return axios.get(process.env.CRAIGSLIST_URL)
//     .then((res) => {
//       const html = res.data;
//       const $ = cheerio.load(html);
//       $('.result-row', html).each(function() {
//         const currentElement = $(this);
//         const id = Number(currentElement.attr('data-pid'));
//         const title = currentElement.find('.result-title').text();
//         const link = currentElement.children('.result-image').attr('href');
        // const images = !currentElement.find('.result-image').attr('data-ids')
        //   ? []
        //   : currentElement.find('.result-image').attr('data-ids').split(',').map((ids) => {
        //     return `https://images.craigslist.org/${ids.slice(2)}_300x300.jpg`;
        //   })
        // ;
//         const price = Number(currentElement.children('.result-info').find('.result-price').text().slice(1));
//         const date = currentElement.children('.result-info').find('.result-date').attr('datetime');
//         const location = currentElement.children('.result-info').find('.result-hood').text();
//         listings.push({
//           id, title, link, images, price, date, location
//         });
//       });
//     })
//     .catch((err) => console.log('err', err));
// };


app.listen(port, () => console.log(`Server running on ${port}`));
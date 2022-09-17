require('dotenv').config();
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

axios.get(process.env.CRAIGSLIST_URL)
  .then((res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    db.query(
      ` 
      WITH filterObj AS (
        SELECT 
          category,
          json_agg(value) as values
        FROM unwanted
        GROUP BY unwanted.category
      )
      SELECT category, values FROM filterObj;
      `
    )
    .then(({ rows: data }) => {
      const unwanted = {};
      data.forEach((obj) => {
        unwanted[obj.category] = [...obj.values];
      });
      return unwanted;
    })
    .then((unwanted) => {
      let limit = 5;
      db.query(`SELECT craigslist_id FROM listings;`).then(({ rows: results}) => {
        const listingIds = results.map((result) => Number(result.craigslist_id));
        console.log('listingids', listingIds);
        $('.result-row', html).each(function(index) {
          if (index < limit) {
            const currentElement = $(this);
            const craigslistId = Number(currentElement.attr('data-pid'));

            if (!listingIds.includes(craigslistId)) {
              const title = currentElement.find('.result-title').text().toLowerCase();
              const condition = (element) => title.includes(element);
              
              // need to make db query to grab unwanted stuff to use below
              if (!unwanted.years.some(condition) && !unwanted.keywords.some(condition)) {
                const price = Number(currentElement.children('.result-info').find('.result-price').text().slice(1).split('').filter((char) => char !== ',').join(''));
                const images = !currentElement.find('.result-image').attr('data-ids')
                  ? []
                  : currentElement.find('.result-image').attr('data-ids').split(',').map((ids) => {
                    return `https://images.craigslist.org/${ids.slice(2)}_300x300.jpg`;
                });
                const date = currentElement.children('.result-info').find('.result-date').attr('datetime');
                const location = currentElement.children('.result-info').find('.result-hood').text();
                const link = currentElement.children('.result-image').attr('href');
          
                // make individual page fetch request timed, as to not get blocked
                setTimeout(() => {
                  axios.get(link).then((res) => {
                    const html = res.data;
                    const $ = cheerio.load(html);
                    const title = $('.body', html).find('.postingtitle').text().trim();
                    const desc = $('.body', html).find('#postingbody').not($('.body', html).find('#postingbody').children()).text().trim();
                    const condition = $('.body', html).find('.attrgroup').children('span:first-child').children('b').text();
                    const item = {
                      craigslistId,
                      link,
                      title,
                      date,
                      desc,
                      price,
                      condition,
                      location,
                      images
                    };

                    return item;
                  })
                  .then((item) => {
                    // need to update table with make, model and size
                    const vals = [item.craigslistId, item.link, item.title, item.desc, item.condition, item.price, item.date, item.location];
                    db.query(`
                      INSERT INTO listings 
                        (craigslist_id, link, title, description, condition, price, date, location) 
                      VALUES
                        ($1, $2, $3, $4, $5, $6, $7, $8)
                      RETURNING *;`
                    , vals)
                    .then((addedItem) => {
                      console.log('item added', addedItem);
                      console.log('images', item.images);
                    })
                  })
                }, index * 1000);
              }
            }
          }
        })
      });
    })
    .catch((err) => console.log('err', err));
     
    // let limit = 3;
    // $('.result-row', html).each(function(index) {
    //   if (index < limit) {
    //     const currentElement = $(this);
    //     const title = currentElement.find('.result-title').text().toLowerCase();
    //     const condition = (element) => title.includes(element);
        

    //     // need to make db query to grab unwanted stuff to use below
    //     if (!unwanted.years.some(condition) && !unwanted.words.some(condition)) {
    //       const id = Number(currentElement.attr('data-pid'));
    //       const price = Number(currentElement.children('.result-info').find('.result-price').text().slice(1));
    //       const images = !currentElement.find('.result-image').attr('data-ids')
    //       ? []
    //       : currentElement.find('.result-image').attr('data-ids').split(',').map((ids) => {
    //         return `https://images.craigslist.org/${ids.slice(2)}_300x300.jpg`;
    //       })
    //     ;
    //       const date = currentElement.children('.result-info').find('.result-date').attr('datetime');
    //       const location = currentElement.children('.result-info').find('.result-hood').text();
    //       const link = currentElement.children('.result-image').attr('href');

    //       // make individual page fetch request timed, as to not get blocked
    //       // build listing object and "INSERT INTO listings..."
    //       setTimeout(() => {
    //         axios.get(link).then((res) => {
    //           const html = res.data;
    //           const $ = cheerio.load(html);
    //           console.log('id', id);
    //           console.log('price', price);
    //           console.log('date', date);
    //           console.log('images', images);
    //           console.log('location', location);
    //           console.log('post title', $('.body', html).find('.postingtitle').text());
    //           console.log('desc', $('.body', html).find('#postingbody').not($('.body', html).find('#postingbody').children()).text().trim());
    //           console.log('condition', $('.body', html).find('.attrgroup').children('span:first-child').children('b').text());
    //         })
    //       }, index * 1000);
    //     }
    //   }
    // })

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
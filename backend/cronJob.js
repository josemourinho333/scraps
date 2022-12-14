const cheerio = require('cheerio');
const axios = require('axios');
const formatTitle = require('./formatTitle');
const notifyMe = require('./mailer');
const db = require('./database/database');

const scrapeData = () => {
  console.log('cron job starting');
  axios.get(process.env.CRAIGSLIST_URL)
  .then((res) => {
    console.log('fetch started. Looking for any new postings...');
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

      db.query(`SELECT craigslist_id FROM listings;`).then(({ rows: results}) => {
        // get all craiglist ids that's already in DB.
        const listingIds = results.map((result) => Number(result.craigslist_id));

        const newItems = [];
        // grab the html fetched and loop over each listings currently on CL.
        $('.result-row', html).each(function(index) {
          const currentElement = $(this);
          const craigslistId = Number(currentElement.attr('data-pid'));
        
          if (!listingIds.includes(craigslistId)) {
            const title = currentElement.find('.result-title').text().toLowerCase();
            const model = formatTitle(title);
            const condition = (element) => title.includes(element);
            const price = Number(currentElement.children('.result-info').find('.result-price').text().slice(1).split('').filter((char) => char !== ',').join(''));

            if (price >= 650) {
              // need to make db query to grab unwanted stuff to use below
              if (!unwanted.years.some(condition) && !unwanted.keywords.some(condition)) {
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
                  axios.get(link)
                  .then((res) => {
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
                      images,
                      model
                    };

                    newItems.push(item);
                    return item;
                  })
                  .then((item) => {
                    // need to update table with make, model and size
                    const vals = [item.craigslistId, item.link, item.title, item.desc, item.condition, item.price, item.date, item.location, item.model];
                    db.query(`
                      INSERT INTO listings 
                        (craigslist_id, link, title, description, condition, price, date, location, model) 
                      VALUES
                        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                      RETURNING *;`
                    , vals)
                    .then((addedItem) => {
                      const promises = [];
                      
                      item.images.forEach((img) => {
                        promises.push(
                          db.query(`
                            INSERT INTO images (listing_id, url) 
                            VALUES (${addedItem.rows[0].id}, '${img}') 
                            RETURNING *;
                          `)
                          .then(() => {
                            console.log('1 img added');
                          })
                          .catch((err) => console.log('img err', err))
                        )
                      });

                      Promise.all(promises)
                        .then(() => {
                          console.log('imgs success');
                        })
                        .catch((err) => console.log('imgs err', err));
                    })
                  })
                  .then(() => {
                    console.log('notfiying if applicable, data scraping is done...')
                    notifyMe();
                  })
                  .catch((err) => console.log('indiv page err', err));
                }, index * 1000);
              }
            }
          }
        })
      })
      .catch((err) => console.log('err from beginning', err));
    })     
  })
  .catch((err) => console.log('err', err));
};

scrapeData();

// module.exports = scrapeData;
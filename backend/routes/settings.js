const router = require('express').Router();
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = db => {
  router.get('/settings', (req, res) => {
    const query = `
      WITH settings AS
        (SELECT
          category, json_agg(value) AS values
        FROM
          unwanted
        GROUP BY
          category)
      SELECT
        json_object_agg(category, values) AS data
      FROM
        settings;  
    `;

    return db.query(query)
      .then(({ rows: settings }) => {
        res.json(settings);
      })
      .catch((err) => console.log('settings db err', err));
  });

  router.post('/settings/new', (req, res) => {
    const category = req.body.category;
    const value = req.body.value;
    const query = `
      INSERT INTO
        unwanted(category, value)
      VALUES
        ($1, $2)
      RETURNING
        id;
    `;

    return db.query(query, [category, value])
      .then(() => {
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
      
            db.query(`SELECT craigslist_id FROM listings;`).then(({ rows: results}) => {
              const listingIds = results.map((result) => Number(result.craigslist_id));
              $('.result-row', html).each(function(index) {
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
      
                          Promise.all(promises).then(() => {
                            console.log('imgs success');
                          })
                          .catch((err) => console.log('imgs err', err));
      
                        })
                      })
                      .catch((err) => console.log('indiv page err', err));
                    }, index * 1000);
                  }
                }
              })
            })
            .catch((err) => console.log('err from beginning', err));
          })     
        })
        .catch((err) => console.log('err', err));
      })
      .catch((err) => console.log('settings db err', err));
  });

  

  return router;
};
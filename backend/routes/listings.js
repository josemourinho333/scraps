const router = require('express').Router();

module.exports = db => {
  router.get('/listings', (req, res) => {
    const query = `
      SELECT 
        listings.id,
        craigslist_id AS craigslistID,
        array_agg(url) AS images,
        date,
        price,
        title,
        description AS desc,
        condition,
        location,
        link
      FROM listings
      JOIN images ON images.listing_id = listings.id
      GROUP BY listings.id
      ORDER BY date desc;
    `;

    return db.query(query)
      .then(({ rows: listings }) => {
        res.json(listings);
      })
      .catch((err) => console.log('get listings err', err));
  });

  return router;
};
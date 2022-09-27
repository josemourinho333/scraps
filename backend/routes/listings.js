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
        link,
        model
      FROM listings
      JOIN images ON images.listing_id = listings.id
      WHERE listings.blacklisted = false
      GROUP BY listings.id
      ORDER BY date desc;
    `;

    return db.query(query)
      .then(({ rows: listings }) => {
        res.json(listings);
      })
      .catch((err) => console.log('get listings err', err));
  });

  router.patch('/listings/:id', (req, res) => {
    const id = req.params.id;
    const query = `
      UPDATE
        listings
      SET
        blacklisted = true
      WHERE
        id = $1
      RETURNING
        id;
    `;

    return db.query(query, [id])
      .then(({ rows: id }) => {
        res.json(id);
      })
      .catch((err) => console.log('err', err));
  });

  router.patch('/listings/edit/:id', (req, res) => {
    const id = req.params.id;
    const model = req.body.model;
    const query = `
      UPDATE
        listings
      SET
        model = $2
      WHERE
        id = $1
      RETURNING
        id;
    `;
    
    return db.query(query, [id, model])
      .then(({ rows: id }) => {
        res.json(id);
      })
      .catch((err) => console.log('err', err));
  });
  
  return router;
};
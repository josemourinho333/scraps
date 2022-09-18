const router = require('express').Router();

module.exports = db => {
  router.get('/listings', (req, res) => {
    const query = `
      SELECT * FROM listings;
    `;

    return db.query(query)
      .then(({ rows: listings }) => {
        res.json(listings);
      })
      .catch((err) => console.log('get listings err', err));
  });

  return router;
};
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
      .then(({ rows: newId }) => {
        res.json(newId);
      })
      .catch((err) => console.log('settings db err', err));
  });

  

  return router;
};
const router = require('express').Router();

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

  return router;
};
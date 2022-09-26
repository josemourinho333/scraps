const router = require('express').Router();

module.exports = db => {
  router.patch('/median', (req, res) => {
    const macbookAirValue = req.body.macbookair;
    const macbookProValue = req.body.macbookpro;
    console.log('in server', macbookAirValue, macbookProValue);

    const query = `
      UPDATE median SET
        median_value = CASE model WHEN $1 THEN $2::integer WHEN $3 THEN $4::integer end
      WHERE model IN ($1, $3)
      RETURNING *;
    `;

    return db.query(query, ["macbookair", macbookAirValue, "macbookpro", macbookProValue])
      .then(({rows: updatedMedian}) => {
        res.json(updatedMedian);
      })
      .catch((err) => console.log('err', err));
  });

  return router;
}
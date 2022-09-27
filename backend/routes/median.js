const router = require('express').Router();

module.exports = db => {
  router.patch('/median', (req, res) => {
    const macbookAirValue = req.body["macbook air"];
    const macbookProValue = req.body["macbook pro"];

    const query = `
      UPDATE median SET
        median_value = CASE model WHEN $1 THEN $2::integer WHEN $3 THEN $4::integer end
      WHERE model IN ($1, $3)
      RETURNING *;
    `;

    return db.query(query, ["macbook air", macbookAirValue, "macbook pro", macbookProValue])
      .then(({rows: updatedMedian}) => {
        res.json(updatedMedian);
      })
      .catch((err) => console.log('err', err));
  });

  return router;
}
const router = require('express').Router();

module.exports = db => {
  router.get('/listings', (request, response) => {
    console.log('req', request);
    console.log('response', response);
  });

  return router;
};
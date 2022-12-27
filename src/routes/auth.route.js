const router = require('express').Router();
const auth = require('../controller/auth.controller');

module.exports = (app) => {
  router.post('/authenticate', auth.login);

  app.use('/api', router);
};

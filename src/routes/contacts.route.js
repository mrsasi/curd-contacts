const router = require('express').Router();
const passport = require('passport');
const contacts = require('../controller/contacts.controller');

module.exports = (app) => {
  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    contacts.create
  );
  router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    contacts.update
  );

  router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    contacts.get
  );

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    contacts.getAll
  );

  router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    contacts.delete
  );

  app.use('/api/contacts', router);
};

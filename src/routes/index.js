const contactsRoute = require('./contacts.route');
const authRoute = require('./auth.route');

module.exports = (app) => {
  authRoute(app);
  contactsRoute(app);
};

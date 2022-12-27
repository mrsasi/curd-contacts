const { Strategy, ExtractJwt } = require('passport-jwt');
const { isEmpty } = require('lodash');
const {
  models: { contacts },
} = require('../../src/models');

module.exports = (passport) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'the-way-of-water',
    passReqToCallback: true,
  };

  passport.use(
    new Strategy(opts, async (req, jwtPayload, done) => {
      try {
        const { userId } = jwtPayload;
        const data = await contacts.findOne({
          attributes: ['contactId', 'email', 'password'],
          raw: true,
          where: { contactId: userId },
        });
        if (isEmpty(data)) throw new Error('error');
        return done(null, { userId });
      } catch (error) {
        req.res.status(401).send({
          success: false,
          message: 'Unauthorized',
        });
      }
      return {};
    })
  );
};

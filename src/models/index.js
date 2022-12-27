const Sequelize = require('sequelize');
const { db } = require('../../config/config');

const { host, user, password, database, dialect, pool } = db;

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect,
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    freezeTableName: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'creationDate',
    updatedAt: 'modifiedDate',
  },
  pool: {
    max: pool.max,
    min: pool.min,
    acquire: pool.acquire,
    idle: pool.idle,
  },
});

require('./contacts.model')(sequelize);

// console.log(sequelize.models);

module.exports = sequelize;

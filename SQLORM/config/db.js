const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('nodeapp', 'test', 'testpassword11', {
  dialect: 'mysql',
  host: 'mariadb',
  logging: false,
} );

module.exports = sequelize;

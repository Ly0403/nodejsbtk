const {Sequelize} = require("sequelize");
const sequelize = require('../config/db');

const Order = sequelize.define('orders', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
} );

module.exports = Order;

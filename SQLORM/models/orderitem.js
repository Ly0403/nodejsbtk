const {Sequelize} = require("sequelize");
const sequelize = require('../config/db');

const OrderItem = sequelize.define('orderitems', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: Sequelize.DOUBLE,
  },
} );

module.exports = OrderItem;

const {Sequelize} = require("sequelize");
const sequelize = require('../config/db');

const CartItem = sequelize.define('cartitems', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
} );

module.exports = CartItem;

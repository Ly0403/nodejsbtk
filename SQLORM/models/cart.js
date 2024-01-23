const {Sequelize} = require("sequelize");
const sequelize = require('../config/db');

const Cart = sequelize.define('carts', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
} );

module.exports = Cart;

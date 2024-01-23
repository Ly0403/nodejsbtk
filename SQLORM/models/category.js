const {Sequelize} = require("sequelize");
const sequelize = require('../config/db');

const Category = sequelize.define('categories', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
} );

module.exports = Category;

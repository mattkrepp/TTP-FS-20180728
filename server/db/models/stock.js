const Sequelize = require('sequelize');
const db = require('../db');

const Stock = db.define('stock', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  dayOpen: {
    type: Sequelize.INTEGER
  }
});

module.exports = Stock;

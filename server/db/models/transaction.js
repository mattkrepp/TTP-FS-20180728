const Sequelize = require('sequelize');
const db = require('../db');

const Transaction = db.define('transaction', {
  purchasePrice: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Transaction;

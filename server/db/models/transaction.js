const Sequelize = require('sequelize');
const db = require('../db');

const Transaction = db.define('transaction', {
  purchasePrice: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  // True if purchasing, false if selling
  purchase: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Transaction;

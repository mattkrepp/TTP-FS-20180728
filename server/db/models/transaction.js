const Sequelize = require('sequelize');
const db = require('../db');

const Transaction = db.define('transaction', {
  purchasePrice: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  // True if purchasing, false if selling
  purchase: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: false
  },
  stockId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: false
  }
});

module.exports = Transaction;

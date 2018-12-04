const User = require('./user');
const Transaction = require('./transaction');
const Stock = require('./stock');

//Model associations
Stock.belongsToMany(User, { through: Transaction, foreignKey: 'stockId' });
User.belongsToMany(Stock, { through: Transaction, foreignKey: 'userId' });

//Consolidating model exports to one place for ease of importing.
module.exports = {
  User,
  Transaction,
  Stock
};

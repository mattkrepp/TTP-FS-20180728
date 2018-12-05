const router = require('express').Router();
const { Stock, User, Transaction } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    //Tried using an inner join, but was getting unique violations for duplicate stock/user entries.
    //Removed association and am doing a modified join manually here
    const transactions = await Transaction.findAll({
      where: { userId: req.user.id }
    });

    //empty stocks object that will eventually be sent to client
    let stocks = {};

    //looping through user's transactions
    for (let i = 0; i < transactions.length; i++) {
      let transaction = transactions[i];

      const { purchase, stockId, quantity } = transaction.dataValues;
      const stock = await Stock.findById(stockId);
      const { symbol } = stock.dataValues;

      //If stock exists on obj, update quantity. Else, add to obj.
      if (stocks[symbol]) {
        //Add to quantity if purchase, subtract from quantity if sale
        stocks[symbol].quantity += purchase ? quantity : -1 * quantity;
      } else {
        stocks[symbol] = {
          quantity,
          dayOpen: stock.dataValues.dayOpen,
          price: stock.dataValues.price
        };
      }
    }
    res.json(stocks);
  } catch (err) {
    next(err);
  }
});

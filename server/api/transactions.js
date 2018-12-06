const router = require('express').Router();
const { Transaction, Stock, User } = require('../db/models');
const Axios = require('axios');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    let transactions = await Transaction.findAll({
      where: { userId: req.user.id }
    });
    for (let i = 0; i < transactions.length; i++) {
      const stock = await Stock.findById(transactions[i].stockId);
      transactions[i] = {
        ...transactions[i].dataValues,
        symbol: stock.dataValues.symbol
      };
    }
    res.json(transactions);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { symbol, mode, quantity } = req.body;
    const { id } = req.user;
    const apiStock = await Axios.get(
      `https://api.iextrading.com/1.0/stock/${symbol}/book`
    );

    //Finds or creates stock with data from API
    let stock = await Stock.findOrCreate({
      where: { symbol: symbol },
      defaults: {
        price: apiStock.data.quote.latestPrice * 100,
        dayOpen: apiStock.data.quote.open * 100
      }
    });

    //Updates price/open for stocks that already exist in db
    if (stock.updatedAt) {
      stock = await Stock.update({
        price: apiStock.data.quote.latestPrice * 100,
        dayOpen: apiStock.data.quote.open * 100
      });
    }

    const purchase = mode === 'buy';

    let user = await User.findById(req.user.id);
    const purchaseTotal = stock[0].dataValues.price * quantity;
    const newBalance = user.dataValues.balance - purchaseTotal;

    if (newBalance > 0) {
      await user.update({ balance: newBalance });
      const transaction = await Transaction.create({
        userId: id,
        stockId: stock[0].dataValues.id,
        quantity,
        purchasePrice: stock[0].dataValues.price,
        purchase
      });

      res.status(201).send({
        symbol: stock[0].dataValues.symbol,
        quantity: transaction.quantity,
        dayOpen: stock[0].dataValues.dayOpen,
        price: transaction.purchasePrice
      });
    } else {
      res.status(400).send({ message: 'Insufficient Funds.' });
    }
    //Creates transaction using db info about stock
  } catch (err) {
    res
      .status(400)
      .send({ message: 'No matching symbols found. Try another query.' });
    next(err);
  }
});

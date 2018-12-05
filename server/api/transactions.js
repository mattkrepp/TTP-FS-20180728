const router = require('express').Router();
const { Transaction, Stock, User } = require('../db/models');
const Axios = require('axios');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    });
    res.json(users);
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

    //Creates transaction using db info about stock
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
  } catch (err) {
    res.status(400).send({ message: 'Not Found' });
    next(err);
  }
});

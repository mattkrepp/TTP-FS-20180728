const Axios = require('axios');
const router = require('express').Router();
const { Stock } = require('../db/models');
module.exports = router;

//Update stocks in background
router.use(async (req, res, next) => {
  try {
    const stocks = await Stock.findAll({
      order: [['id', 'ASC']]
    });

    const currentTime = new Date();
    const twoMinsInMs = 120000;

    for (let i = 0; i < stocks.length; i++) {
      const { symbol, updatedAt } = stocks[i].dataValues;
      const timeDifference = currentTime - updatedAt;
      if (timeDifference > twoMinsInMs) {
        const apiStock = await Axios.get(
          `https://api.iextrading.com/1.0/stock/${symbol}/book`
        );
        console.log('from api, stock deets: ', apiStock.data.quote);

        await stocks[i].update({
          price: apiStock.data.quote.latestPrice * 100,
          dayOpen: apiStock.data.quote.open * 100
        });
      }
    }

    next();
  } catch (err) {
    next(err);
  }
});

router.use('/users', require('./users'));
router.use('/transactions', require('./transactions'));
router.use('/stocks', require('./stocks'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

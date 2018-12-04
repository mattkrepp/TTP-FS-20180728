const router = require('express').Router();
const { Transaction, Stock, User } = require('../db/models');
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
    const stocks = await Stock.findAll({
      include: [
        {
          model: User,
          through: {
            where: { userId: req.user.id }
          }
        }
      ]
    });
    res.json(stocks);
  } catch (err) {
    next(err);
  }
});

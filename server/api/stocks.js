const router = require('express').Router();
const { Stock, User } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
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

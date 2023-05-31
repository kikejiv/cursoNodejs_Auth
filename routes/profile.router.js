// codigo para retornar las ordenes de compras por cliente
const express = require('express');
const passport = require('passport');

const OrderService = require('../services/order.service');

const router = express.Router();
const service = new OrderService();

router.get('/my-orders',
passport.authenticate('jwt', {session: false}), //indicamos por cual estrategia queremos autenticar y en el momento sin sessiones
  async (req, res, next) => {
    try {
      const user = req.user;
      const orders = await service.findByUser(user.sub); //desde user.sub se envia el id del usuario debido a que ya hayu na sesion
      res.json(orders)
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

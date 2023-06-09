const express = require('express');
const router = express.Router();
const Orders = require('../controllers/orders');


router.post('/createOrder', Orders.createOrder);

module.exports = router;
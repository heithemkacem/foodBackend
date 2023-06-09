const express = require('express');
const router = express.Router();
const Dish = require("../controllers/dish")
    // const { isAuthenticated, isAdmin } = require("../middleware/auth");


router.post('/createDish', Dish.createDish);


module.exports = router;
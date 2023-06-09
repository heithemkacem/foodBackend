const express = require('express');
const router = express.Router();
const category = require('../controllers/categories');

router.post('/getcategory', category.getcategory);
router.post('/createcategory', category.createCategory);

module.exports = router;
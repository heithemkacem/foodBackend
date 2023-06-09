const express = require('express');
const router = express.Router();
const category = require('../controllers/categories');

router.post('/getcategory', category.getcategory);
router.post('/createcategory', category.createCategory);
router.post('/updateCategory', category.updateCategory);
router.post('/deleteCategory', category.DeleteCategory);

module.exports = router;
const express = require('express');
const router = express.Router();
const image = require('../controllers/imagebase64');

router.post('/uploadImage', image.uploadImage);

module.exports = router;
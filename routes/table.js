const express = require('express');
const router = express.Router();
const table = require('../models/table');

router.post('/table', table);

module.exports = router;
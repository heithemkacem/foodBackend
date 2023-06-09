const express = require('express');
const router = express.Router();
const Client = require('../controllers/client');

router.post('/signup', Client.signup);
router.post('/login', Client.login);
router.post('/logout', Client.logout);
router.post('/updatePassword', Client.updatePassword);

module.exports = router;
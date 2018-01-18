const express = require('express');
const router = express.Router();
const secure = require('../configs/secure.config');
const tweetsController = require('../controllers/tweets.controller');

router.get('/', tweetsController.index);
router.post('/', secure.isAuthenticated, tweetsController.create);

module.exports = router;

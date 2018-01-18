const express = require('express');
const router = express.Router();
const secure = require('../configs/secure.config');
const tweetsController = require('../controllers/tweets.controller');

router.use(secure.isAuthenticated);

router.get('/', tweetsController.index);
router.post('/', tweetsController.create);

module.exports = router;

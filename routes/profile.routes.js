const express = require('express');
const router = express.Router();
const secure = require('../configs/secure.config');
const profileController = require('../controllers/profile.controller');

router.get('/:username', profileController.show);
router.post('/:username/follow', profileController.follow);

module.exports = router;

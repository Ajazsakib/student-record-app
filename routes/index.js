const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

const csvController = require('../controllers/csvController');

router.get('/', userController.dashboard);

router.get('/createCsvFile', csvController.makeCsvFile);

router.use('/user', require('./user'));
router.use('/student', require('./student'));
router.use('/batch', require('./batch'));
router.use('/score', require('./score'));
router.use('/interview', require('./interview'));

module.exports = router;

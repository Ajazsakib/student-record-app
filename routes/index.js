const express = require("express")

const router = express.Router()

const userController = require("../controllers/userController")

router.get("/", userController.dashboard)



router.use('/user', require('./user'));
router.use('/student', require('./student'));
router.use('/batch', require('./batch'));
router.use('/score', require('./score'));

module.exports = router
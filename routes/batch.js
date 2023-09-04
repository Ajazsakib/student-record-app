const express = require("express")

const router = express.Router()

const batchController = require("../controllers/batchController")

router.get("/", batchController.batchList)

router.get("/add", batchController.addBatch)

router.post("/createBatch", batchController.createBatch)


module.exports = router
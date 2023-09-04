const express = require("express")

const router = express.Router()

const scoreController = require("../controllers/scoreController")

router.get("/", scoreController.scoreList)

router.get("/add", scoreController.addScore)

router.post("/createScore", scoreController.createScore)


module.exports = router
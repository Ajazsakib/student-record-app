const express = require("express")

const router = express.Router()

const studentController = require("../controllers/studentController")


router.get("/", studentController.studentList)
router.get("/add", studentController.addNewStudent)

router.post("/createStudent", studentController.createStudent)




module.exports = router



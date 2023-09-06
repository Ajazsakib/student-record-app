const express = require("express")

const router = express.Router()

const studentController = require("../controllers/studentController")


router.get("/", studentController.studentList)
router.get("/add", studentController.addNewStudent)

router.post("/createStudent", studentController.createStudent)

router.get("/delete/:id", studentController.deleteStudent)

router.get("/result", studentController.result)




module.exports = router



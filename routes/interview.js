const express = require("express")

const router = express.Router()

const interviewController = require("../controllers/interviewController")

router.get("/", interviewController.interviewList)

router.get("/add", interviewController.addInterview)

router.post("/createInterview", interviewController.createInterview)

router.get("/allocate/:id", interviewController.allocateStudentForm)

router.post("/allocate/:id", interviewController.allocateStudents)

router.get("/:id", interviewController.allocateStudentList)

router.post("/createResult/:id", interviewController.createResult)


module.exports = router
const Student = require("../models/student")
const Score = require("../models/score")
const Interview = require("../models/interview")
const Result = require("../models/result")

module.exports.makeCsvFile = async function (req, res)
{
    const students = await Student.find({})
    const scores = await Score.find({}).populate("student")
    const interviews = await Interview.find({})
    const results = await Result.find({})

    // Initialize an empty array to store the merged objects

    const mergedArray = []

    // Iterate through each array and extract the desired properties

    students.forEach((student) =>
    {
        const studentData = {
            name: student.name,
            // Add other properties you need from the Student model
        }
        // Find the corresponding score, interview, and result data
        const score = scores.find(score => score.student._id === student._id)
        const interview = interviews.find(interview => interview.studentId === student._id)


    })



}
const Interview = require("../models/interview")
const Student = require("../models/student")
const Result = require("../models/result")
module.exports.interviewList = async function (req, res)
{
    const interviews = await Interview.find({})
    return res.render("interviewList", {
        title: "Student Record App",
        interviews: interviews,
    })
}

module.exports.addInterview = function (req, res)
{
    return res.render("addInterview", {
        title: "Student Record App",
    })
}

module.exports.createInterview = async function (req, res)
{

    const newInterview = new Interview({
        subject: req.body.subject,
        date: req.body.date,
        companyName: req.body.companyName,
    })

    await newInterview.save()
    res.redirect("/interview")
}

module.exports.allocateStudentForm = async function (req, res)
{
    const students = await Student.find({})
    interviewId = req.params.id
    return res.render("allocateStudentForm", {
        title: "Student Record App",
        students: students,
        interviewId: interviewId,
    })
}

module.exports.allocateStudents = async function (req, res)
{
    const selectedStudents = req.body.student
    const interviewId = req.params.id;
    const interview = await Interview.findById(interviewId);
    console.log(interview.students)
    interview.students = selectedStudents

    await interview.save();
    res.redirect("/interview")
}


module.exports.allocateStudentList = async function (req, res)
{
    const interview = await Interview.findById(req.params.id).populate("students")
    return res.render("allocateStudentList", {
        title: "Student Record App",
        interview: interview,
    })
}


module.exports.createResult = async function (req, res)
{
    const interview = await Interview.findById(req.params.id).populate("students")
    console.log(req.body)
    for (key in req.body) {
        if (key.startsWith('result_')) {
            const studentName = key.replace('result_', '');
            const newResult = new Result({
                studentName: studentName,
                companyName: interview.companyName,
                interviewSubject: interview.subject,
                result: req.body[key]
            })

            await newResult.save()
        }
    }

    const results = await Result.find({})
    return res.render("result", {
        title: "Student Record App",
        results: results,
    })
}
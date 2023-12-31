const Batch = require("../models/batch")
const Student = require("../models/student")
module.exports.studentList = async function (req, res)
{
    const students = await Student.find({}).populate("batch")



    return res.render("studentList", {
        title: "Student Record App",
        students: students,
    })
}

module.exports.addNewStudent = async function (req, res)
{

    const batches = await Batch.find({})

    return res.render("addNewStudent", {
        title: "Student Record App",
        batches: batches,
    })
}

module.exports.createStudent = async function (req, res)
{
    const batch = await Batch.findOne({ name: req.body.batchName })
    const newStudent = new Student({
        name: req.body.name,
        batch: batch._id,
        status: req.body.status,
    })

    await newStudent.save()

    res.redirect("/student")
}

module.exports.deleteStudent = async function (req, res)
{
    await Student.findByIdAndDelete(req.params.id)

    res.redirect("/student")
}


const Result = require("../models/result")
module.exports.result = async function (req, res)
{

    const results = await Result.find({})
    return res.render("resultList", {
        title: "Student Record App",
        results: results,
    })
}
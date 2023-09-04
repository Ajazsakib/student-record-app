const Student = require("../models/student")
const Score = require("../models/score")
module.exports.scoreList = async function (req, res)
{

    const scores = await Score.find({}).populate("student")

    return res.render("scoreList", {
        title: "Student Record App",
        scores: scores,
    })
}

module.exports.addScore = async function (req, res)
{
    const students = await Student.find({})
    return res.render("addScore", {
        title: "Student Record App",
        students: students,
    })
}


module.exports.createScore = async function (req, res)
{
    const student = await Student.findOne({ name: req.body.student })

    const newScore = new Score({
        student: student._id,
        dsaScore: req.body.dsaScore,
        webDScore: req.body.webDScore,
        reactScore: req.body.reactScore
    })

    await newScore.save()

    res.redirect("/score")
}
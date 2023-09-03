module.exports.studentList = function (req, res)
{
    return res.render("index", {
        title: "Student Record App"
    })
}

module.exports.addNewStudent = function (req, res)
{
    return res.render("addNewStudent", {
        title: "Student Record App"
    })
}
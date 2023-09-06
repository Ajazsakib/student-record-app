const mongoose = require("mongoose")

const resultSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    interviewSubject: {
        type: String,
        required: true,
    },
    result: {
        type: String,
        required: true,
    }
})

const Result = mongoose.model("Result", resultSchema)

module.exports = Result
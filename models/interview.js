const mongoose = require("mongoose")

const interviewSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
}, {
    default: { students: [] },
})


const Interview = mongoose.model("Interview", interviewSchema)

module.exports = Interview
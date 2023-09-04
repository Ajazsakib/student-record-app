const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch"
    },
    status: {
        type: String,
        required: true,
    },


})

const Student = mongoose.model("Student", studentSchema)

module.exports = Student
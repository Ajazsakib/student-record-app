const mongoose = require("mongoose")

const scoreSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    dsaScore: {
        type: String,
    },
    webDScore: {
        type: String,
    },
    reactScore: {
        type: String,
    }
})

const Score = mongoose.model("Score", scoreSchema)

module.exports = Score
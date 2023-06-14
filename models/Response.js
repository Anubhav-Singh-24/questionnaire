const mongoose = require('mongoose')
const { Schema } = mongoose

// The response schema consists of unique userId, uniqueTestid as well as an array of objects.
// The answer array consists of objects containing the questionid and the selected answers of that question

const responseSchema = new Schema({
    userId: String,
    testId: String,
    answers: [{ questionId: String, selectedAnswers: [String] }],
})

const Response = mongoose.model('response',responseSchema)
module.exports = Response
const mongoose = require('mongoose')
const { Schema } = mongoose

// Our test schema consist of a unique test id, a test name and an array of questions (array of objects). 
// The array consists of objects like the unique question id, the question itself, and an array of objects.
// The choices array contains the options, the optionid and a boolean variable to determine it is correct or not.
// The questions will be hardcoded in the database based on this schema

const TestSchema = new Schema({
    testId: String,
    testName: String,
    questions: [
        {
            questionId: String,
            questionText: String,
            choices: [{ answerId: String, answerText: String, isCorrect: Boolean }],
        },
    ],
})

const Test = mongoose.model('test',TestSchema)
module.exports = Test
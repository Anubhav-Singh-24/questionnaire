const express = require('express')
const router = express.Router()
const Test = require('../models/Test')
const fetchuser = require('../middleware/fetchdetail')
const Response = require('../models/Response')
const User = require('../models/User')


// Route 1: To get all the test ids and the test names
router.get('/tests', async (req, res) => {
    try {

        const tests = await Test.find({}, 'testId testName').lean();
        const test = tests.map(test => ({ testId: test.testId, testName: test.testName }))
        res.json(test);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
})


// Route 2: To submit the test
router.post('/submit-test/:id', fetchuser, async (req, res) => {
    const { testId, answers } = req.body;

    // Checking whether the user is registered or not
    let userId = req.params.id
    let found = await User.findById(userId)
    if (!found) {
        return res.status(404).send("Not found");
    }

    // Checking if the user is submitting someone else's test or not
    if (found._id.toString() !== req.user.id) {
        return res.status(401).send("Not allowed")
    }

    // Check if the user has already taken the test with the help of unique testId and userId
    const existingResponse = await Response.findOne({ userId, testId });
    if (existingResponse) {
        return res.status(400).json({ error: 'User has already taken this test.' });
    }

    try {
        // Find the test in the database based on the testId
        const test = await Test.findOne({ testId });
        if (!test) {
            return res.status(404).json({ error: 'Test not found.' });
        }

        // Calculating the score of the user
        let score = 0;
        answers.forEach((answer) => {
            const question = test.questions.find((q) => q.questionId === answer.questionId);
            if (question) {
                const selectedChoices = answer.selectedAnswers;
                const correctChoices = question.choices.filter((c) => c.isCorrect).map((c) => c.answerId);
                if (
                    selectedChoices.length === correctChoices.length &&
                    selectedChoices.every((choice) => correctChoices.includes(choice))
                ) {
                    score++;
                }
            }
        });

        // Saving the user's response to the database
        const response = new Response({ userId, testId, answers });
        await response.save();

        // Returning the response with the calculated score
        return res.json({ userId, testId, score });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});


module.exports = router
const mongoose = require('mongoose');
const connectDB = require('./db.js')
const Test = require('./models/Test.js');

connectDB()

// These questions will be hardcoded in the database

const testData = [
    {
        testId: 'ml1',
        testName: 'Machine Learning',
        questions: [
            {
                questionId: 'q1',
                questionText: 'What is the purpose of regularization in machine learning?',
                choices: [
                    { answerId: 'a1', answerText: 'To Reduce Bias', isCorrect: false },
                    { answerId: 'a2', answerText: 'To Reduce Variance', isCorrect: false },
                    { answerId: 'a3', answerText: 'To Improve model generalization', isCorrect: false },
                    { answerId: 'a4', answerText: 'All of the above', isCorrect: true },
                ],
            },
            {
                questionId: 'q2',
                questionText: 'Which evaluation metric is commonly used for imbalanced classification problems?',
                choices: [
                    { answerId: 'a1', answerText: 'Accuracy', isCorrect: false },
                    { answerId: 'a2', answerText: 'Precision', isCorrect: false },
                    { answerId: 'a3', answerText: 'Recall', isCorrect: false },
                    { answerId: 'a4', answerText: 'F1-Score', isCorrect: true },
                ],
            },
            {
                questionId: 'q3',
                questionText: 'What is the purpose of the Adam optimizer in deep learning?',
                choices: [
                    { answerId: 'a1', answerText: 'To update model weights based on the gradient of the loss function', isCorrect: true },
                    { answerId: 'a2', answerText: 'To initialize the model weights', isCorrect: false },
                    { answerId: 'a3', answerText: 'To regularize the model weights', isCorrect: false },
                    { answerId: 'a4', answerText: 'To reduce the learning rate during training', isCorrect: false },
                ],
            },
            {
                questionId: 'q4',
                questionText: 'Which algorithm is commonly used for anomaly detection in unsupervised learning?',
                choices: [
                    { answerId: 'a1', answerText: 'K-nearest neighbors (KNN)', isCorrect: false },
                    { answerId: 'a2', answerText: ' Support Vector Machines (SVM)', isCorrect: false },
                    { answerId: 'a3', answerText: 'Gaussian Mixture Models (GMM)', isCorrect: false },
                    { answerId: 'a4', answerText: 'Isolation Forest', isCorrect: true },
                ],
            },
            // Add more questions for Test 1
        ],
    },
    {
        testId: 'cf2',
        testName: 'Computer Science Fundamentals',
        questions: [
            {
                questionId: 'q1',
                questionText: 'What is the time complexity of searching for an element in a balanced binary search tree (BST)?',
                choices: [
                    { answerId: 'a1', answerText: 'O(log n)', isCorrect: true },
                    { answerId: 'a2', answerText: 'O(n)', isCorrect: false },
                    { answerId: 'a3', answerText: 'O(n log n)', isCorrect: false },
                    { answerId: 'a4', answerText: 'O(1)', isCorrect: false },
                ],
            },
            {
                questionId: 'q2',
                questionText: 'Which sorting algorithm has the best average-case time complexity?',
                choices: [
                    { answerId: 'a1', answerText: 'Bubble Sort', isCorrect: false },
                    { answerId: 'a2', answerText: 'Quick Sort', isCorrect: true },
                    { answerId: 'a3', answerText: 'Insertion Sort', isCorrect: false },
                    { answerId: 'a4', answerText: 'Selection Sort', isCorrect: false },
                ],
            },
            {
                questionId: 'q3',
                questionText: 'Which data structure is best suited for implementing a priority queue?',
                choices: [
                    { answerId: 'a1', answerText: 'Array', isCorrect: false },
                    { answerId: 'a2', answerText: 'Linked List', isCorrect: false },
                    { answerId: 'a3', answerText: 'Heap', isCorrect: true },
                    { answerId: 'a4', answerText: 'Stack', isCorrect: false },
                ],
            },
            {
                questionId: 'q4',
                questionText: 'What is the purpose of dynamic programming in computer science?',
                choices: [
                    { answerId: 'a1', answerText: 'To minimize the memory usage of algorithms', isCorrect: false },
                    { answerId: 'a2', answerText: 'To optimize the runtime of algorithms', isCorrect: false },
                    { answerId: 'a3', answerText: 'To divide a large problem into smaller overlapping subproblems', isCorrect: true },
                    { answerId: 'a4', answerText: 'To manage the execution of parallel programs', isCorrect: false },
                ],
            },
            // Add more questions for Test 2
        ],
    },
];


// Insert test data into the database
Test.insertMany(testData)
    .then(() => {
        console.log('Test data inserted successfully.');
        mongoose.disconnect();
    })
    .catch((error) => {
        console.error('Error inserting test data:', error);
        mongoose.disconnect();
    });

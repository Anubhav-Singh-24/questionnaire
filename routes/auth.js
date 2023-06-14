const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchdetail')

const jwtSecret = 'f4$d64df#J%tj'

// Route 1: A simple welcome to the user
router.get('/welcome', (req, res) => {
    res.status(200).json({
        success: true,
        message: "API successfully called"
    })
})

// Route 2: Sign up for the new user (or create user).
router.post('/signup', [
    // Validating the requests
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('password', 'Password should be minimum 7 characters').isLength({ min: 7 }),
], async (req, res) => {
    let success = false;
    // If their is some error return badrequest and the error
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ success, error: error.array() })
    }

    // Using try and catch to handle any unecessary errors
    try {
        // Checking for the duplicate emails
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success, error: "This email id already exists!!" })
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hashSync(req.body.password, salt)

        // Creating a user with name, id and password (phone optional)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            phone: req.body.phone
        })

        // The data that needed to be sent in JWT token
        const data = {
            user: {
                id: user.id
            }
        }

        // Creating an authentication token
        const authToken = jwt.sign(data, jwtSecret)
        success = true;
        res.json({ success,authToken, message:"Signeup successfully" })

    } catch (error) {
        console.error(error)
        res.status(500).send("Some Error Occured")
    }

})

// Route 3: Sign in for an existing user
router.post('/signin',[

    // Validating the requests
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),

],async (req, res) => {
    let success = false;

    // If their is some error return badrequest and the error
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ success,error: error.array() })
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({success, error: "Invalid Credentials!!" })
        }

        const pswdCmp = await bcrypt.compare(password, user.password);
        if (!pswdCmp) {
            return res.status(400).json({success, error: "Invalid Credentials!!" })
        }

        const data = {
            user: {
                id: user.id
            }
        }

        success = true;

        // Creating an authentication token
        const authToken = jwt.sign(data, jwtSecret)
        res.json({success, authToken, message:"Welcome Back!!" })


    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")
    }

})

// Route 4: Get user details using Post at the endpoint "/api/auth/getuser"

// Calling our middleware fetuser to get the user details
router.post('/getuser', fetchuser, async(req,res)=>{
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error Occured")
    }
})

module.exports = router;
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const fetchuser = require('../middleware/fetchdetail')

router.put('/updatephone/:id', fetchuser, async (req, res) => {
    try {
        const { phone } = req.body

        const updated = {}
        // If their are value to be updated then update it
        if (phone) { updated.phone = phone; }

        // Finding if the user exists in the database or not
        let found = await User.findById(req.params.id)
        if (!found) {
            return res.status(404).send("Not found");
        }

        // Checking if the user is not updating someone else's phone details
        if (found._id.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }

        // Updating the phone
        found = await User.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
        res.json({ success:true, message:"Phone number changed/added successfully" })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")
    }
})

module.exports = router
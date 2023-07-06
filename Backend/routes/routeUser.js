const express = require('express');
const router = express.Router();

const User = require('../models/userSchema');

router.get("/", async (req, res) => {
    const users = await User.find();
    res.json(users);
})

router.post("/", (req, res) => {
    const user = new User({
        user_name: req.body.user_name,
        user_pass: req.body.user_pass,
    });
    user.save();
    res.json(user);
})

router.put("/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    user.user_name = req.body.user_name;
    user.user_pass = req.body.user_pass;
    user.save();
    res.json(user);
})

router.delete("/:id", async (req, res) => {
    const result = await User.findByIdAndDelete(req.params.id);
    res.json(result); 
})

module.exports = router;
require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const hashPass = require('../utility/hashPass');

router.get("/", async (req, res) => {
    const users = await User.find();
    res.json(users);
})

router.post("/register", async (req, res) => {
    try {
        const newPassword = await hashPass.generateHash(req.body.password);
		await User.create({
			username: req.body.username,
			password: newPassword,
		})
    }
    catch (err){
        err.json({ status: 'error', error: 'Duplicate username' })
    }
})

router.post("/login", async (req, res) => {
    const user = await User.findOne({
		username: req.body.username,
	})
	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}
	const isPasswordValid = await hashPass.checkValidity(
		req.body.password,
		user.password
	)
	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			process.env.SECRET_JWT_PASS
		)
		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})

module.exports = router;
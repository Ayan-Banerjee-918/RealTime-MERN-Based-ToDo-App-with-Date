require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const hashPass = require('../utility/hashPass');
const jwt = require('jsonwebtoken');

router.get("/", async (req, res) => {
    const users = await User.find();
    res.json(users);
})

router.post("/register", async (req, res) => {

	if (/^(?![_0-9]+$)[\w]{4,}$/.test(req.body.username) && req.body.password.length >= 8) {
		try {
			const newPassword = await hashPass.generateHash(req.body.password);
			await User.create({
				username: req.body.username,
				password: newPassword,
			})
			res.sendStatus(201);
		}
		catch (err) {
			res.sendStatus(401);
		}
	}
	else {
		res.sendStatus(402);
	}
})

router.post("/login", async (req, res) => {
    const user = await User.findOne({
		username: req.body.username,
	})
	if (!user) {
		return res.sendStatus(402)
	}
	const isPasswordValid = await hashPass.checkValidity(
		req.body.password,
		user.password
	)
	if (isPasswordValid) {
		const token = jwt.sign(
			{
				exp: Math.floor(Date.now() / 1000) + (60 * 60),
				name: user.name,
			},
			process.env.SECRET_JWT_PASS
		)
		return res.status(200).send({ token: token })
	} else {
		return res.sendStatus(403);
	}
})

module.exports = router;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/userModel.js");

exports.userByToken = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");

		res.json({ user });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

exports.login = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() });

	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user)
			return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch)
			return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });

		const payload = {
			user: {
				id: user.id,
			},
		};

		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRES },
			(err, token) => {
				if (err) throw err;

				res.status(200).json({
					success: true,
					token,
				});
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

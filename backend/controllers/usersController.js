const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/userModel.js");

exports.createUser = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() });

	const { name, email, password } = req.body;

	try {
		let user = await User.findOne({ email });

		if (user)
			return res.status(400).json({ errors: [{ msg: "User already exists" }] });

		const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

		user = new User({ name, email, avatar, password });

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		await user.save();

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
					message: `User is registered successfully: ${email}`,
					token,
				});
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

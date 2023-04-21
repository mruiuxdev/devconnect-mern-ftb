const express = require("express");
const { check } = require("express-validator");
const { createUser } = require("../controllers/usersController");

const router = express.Router();

router.route("/register").post(
	[
		check("name", "Name is required").not().isEmpty(),
		check("email", "Please include a valid email").isEmail(),
		check("password", "Please enter a password 6 or more characters").isLength({
			min: 6,
		}),
	],
	createUser
);

module.exports = router;

const express = require("express");
const auth = require("../middleware/auth");
const { check } = require("express-validator");
const { userByToken, login } = require("../controllers/authController");

const router = express.Router();

router.route("/auth").get(auth, userByToken);
router
	.route("/login")
	.post(
		[
			check("email", "Please include a valid email").isEmail(),
			check("password", "Password is required").exists(),
		],
		login
	);

module.exports = router;

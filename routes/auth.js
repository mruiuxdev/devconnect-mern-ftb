const express = require("express");
const auth = require("../middleware/auth");
const { userByToken } = require("../controllers/authController");

const router = express.Router();

router.route("/auth").get(auth, userByToken);

module.exports = router;

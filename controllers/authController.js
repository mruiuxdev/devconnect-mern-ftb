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

const { validationResult } = require("express-validator");

exports.createUser = (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() });

	res.status(200).json({
		success: true,
	});
};

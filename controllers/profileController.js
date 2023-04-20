const { validationResult } = require("express-validator");
const Profile = require("../models/profileModel");
const User = require("../models/userModel");

exports.profile = async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate([
			"user",
			"name",
			"avatar",
		]);

		if (!profile)
			return res
				.status(400)
				.json({ message: "There is no profile for this user" });

		res.status(200).json({
			success: true,
			profile,
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

exports.createProfile = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() });

	const {
		company,
		website,
		location,
		bio,
		status,
		githubUsername,
		skills,
		youtube,
		facebook,
		twitter,
		instagram,
		linkedin,
	} = req.body;

	const profileFields = {};
	profileFields.user = req.user.id;

	if (company) profileFields.company = company;
	if (website) profileFields.website = website;
	if (location) profileFields.location = location;
	if (bio) profileFields.bio = bio;
	if (status) profileFields.status = status;
	if (githubUsername) profileFields.githubUsername = githubUsername;
	if (skills)
		profileFields.skills = skills.split(",").map((skill) => skill.trim());

	profileFields.social = {};
	if (youtube) profileFields.social.youtube = youtube;
	if (facebook) profileFields.social.facebook = facebook;
	if (twitter) profileFields.social.twitter = twitter;
	if (instagram) profileFields.social.instagram = instagram;
	if (linkedin) profileFields.social.linkedin = linkedin;

	try {
		let profile = await Profile.findOne({ user: req.user.id });

		if (profile) {
			profile = await Profile.findOneAndUpdate(
				{ user: req.user.id },
				{ $set: profileFields },
				{ new: true }
			);

			return res.status(200).json({
				success: true,
				message: "Profile is updated",
				profile,
			});
		}

		profile = new Profile(profileFields);

		await profile.save();

		return res.status(200).json({
			success: true,
			message: "Profile is created",
			profile,
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

exports.allProfiles = async (req, res) => {
	try {
		const profiles = await Profile.find().populate("user", ["name", "avatar"]);

		return res.status(200).json({
			success: true,
			profiles,
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

exports.profileByUserId = async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.params.userId }).populate(
			"user",
			["name", "avatar"]
		);

		if (!profile)
			return res
				.status(400)
				.json({ message: "There is no profile for this user" });

		return res.status(200).json({
			success: true,
			profile,
		});
	} catch (err) {
		console.error(err.message);
		if (err.kind === "ObjectId")
			return res
				.status(400)
				.json({ message: "There is no profile for this user" });
		res.status(500).send("Server Error");
	}
};

exports.deleteProfileAndUser = async (req, res) => {
	try {
		const profile = await Profile.findOneAndRemove({ user: req.user.id });
		const user = await User.findOneAndRemove({ _id: req.user.id });

		if (!profile)
			return res
				.status(400)
				.json({ message: "There is no profile for this user" });

		return res.status(200).json({
			success: true,
			message: "User is deleted",
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

exports.addExperience = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() });

	const { title, company, location, from, to, current, description } = req.body;

	const newExperience = {
		title,
		company,
		location,
		from,
		to,
		current,
		description,
	};

	try {
		const experience = await Profile.findOne({ user: req.user.id });

		experience.experience.unshift(newExperience);

		await experience.save();

		res.status(200).json({
			success: true,
			message: "Experience is added",
			experience,
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

exports.deleteExperience = async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		const removeIndex = profile.experience
			.map((item) => item.id)
			.indexOf(req.params.experienceId);

		profile.experience.splice(removeIndex, 1);

		res.status(200).json({
			success: true,
			message: "Experience is deleted",
			profile,
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

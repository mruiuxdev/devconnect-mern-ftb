const request = require("request");
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
		const profile = await Profile.findOne({ user: req.user.id });

		profile.experience.unshift(newExperience);

		await profile.save();

		res.status(200).json({
			success: true,
			message: "Experience is added",
			profile,
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

		await profile.save();

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

exports.addEducation = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() });

	const { school, degree, fieldOfStudy, from, to, current, description } =
		req.body;

	const newEducation = {
		school,
		degree,
		fieldOfStudy,
		from,
		to,
		current,
		description,
	};

	try {
		const profile = await Profile.findOne({ user: req.user.id });

		profile.education.unshift(newEducation);

		await profile.save();

		res.status(200).json({
			success: true,
			message: "Education is added",
			profile,
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

exports.deleteEducation = async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		const removeIndex = profile.education
			.map((item) => item.id)
			.indexOf(req.params.educationId);

		profile.education.splice(removeIndex, 1);

		await profile.save();

		res.status(200).json({
			success: true,
			message: "Education is deleted",
			profile,
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

exports.github = async (req, res) => {
	try {
		const options = {
			url: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`,
			method: "GET",
			headers: { "user-agent": "node.js" },
		};

		request(options, (error, response, body) => {
			if (error) console.error(error);

			if (response.statusCode !== 200)
				return res
					.status(404)
					.json({ success: true, message: "No github found" });

			res.status(200).json({
				success: true,
				github: JSON.parse(body),
			});
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

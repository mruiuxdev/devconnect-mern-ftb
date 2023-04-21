const express = require("express");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const {
	profile,
	createProfile,
	allProfiles,
	profileByUserId,
	deleteProfileAndUser,
	addExperience,
	deleteExperience,
	addEducation,
	deleteEducation,
	github,
} = require("../controllers/profileController");

const router = express.Router();

router
	.route("/profile")
	.get(auth, profile)
	.post(
		auth,
		[
			check("status", "Status is required").not().isEmpty(),
			check("skills", "Skills is required").not().isEmpty(),
		],
		createProfile
	);
router.route("/profiles").get(allProfiles);
router.route("/profile/:userId").get(profileByUserId);
router.route("/profile").delete(auth, deleteProfileAndUser);
router
	.route("/profile/experience")
	.put(
		auth,
		[
			check("title", "Title is required").not().isEmail(),
			check("company", "Company is required").not().isEmpty(),
			check("company", "Company is required").not().isEmpty(),
			check("from", "From date is required").not().isEmpty(),
		],
		addExperience
	);
router
	.route("/profile/experience/:experienceId")
	.delete(auth, deleteExperience);
router
	.route("/profile/education")
	.put(
		auth,
		[
			check("school", "School is required").not().isEmail(),
			check("degree", "Degree is required").not().isEmpty(),
			check("fieldOfStudy", "Field of study is required").not().isEmpty(),
			check("from", "From date is required").not().isEmpty(),
		],
		addEducation
	);
router.route("/profile/education/:educationId").delete(auth, deleteEducation);
router.route("/profile/github/:username").get(github);

module.exports = router;

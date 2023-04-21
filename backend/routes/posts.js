const express = require("express");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const {
	createPost,
	posts,
	postById,
	deletePost,
	likePost,
	unLikePost,
	addComment,
	deleteComment,
} = require("../controllers/postsController");

const router = express.Router();

router
	.route("/post/create")
	.post(
		auth,
		[check("content", "Content is required").not().isEmpty()],
		createPost
	);
router.route("/posts").get(auth, posts);
router.route("/post/:id").get(auth, postById).delete(auth, deletePost);
router.route("/post/like/:id").put(auth, likePost);
router.route("/post/unlike/:id").put(auth, unLikePost);
router
	.route("/post/comment/:id")
	.post(
		auth,
		[check("content", "Content is required").not().isEmpty()],
		addComment
	);
router.route("/post/comment/:id/:commentId").delete(auth, deleteComment);

module.exports = router;

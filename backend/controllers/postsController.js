const { validationResult } = require("express-validator");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const Profile = require("../models/profileModel");

exports.createPost = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const user = await User.findById(req.user.id).select("-password");

    const newPost = new Post({
      content: req.body.content,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    });

    await newPost.save();

    res.status(200).json({
      success: true,
      message: "Post is added",
      newPost,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.posts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.postById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post)
      return res.status(404).json({ success: true, message: "Post not found" });

    res.status(200).json({
      success: true,
      post,
    });
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId")
      return res.status(404).json({ success: true, message: "Post not found" });
    res.status(500).send("Server Error");
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndRemove(req.params.id);

    if (post.user.toString() !== req.user.id)
      return res
        .status(401)
        .json({ success: true, message: "User not authorized" });

    if (!post)
      return res.status(404).json({ success: true, message: "Post not found" });

    res.status(200).json({
      success: true,
      message: "Post is deleted",
    });
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId")
      return res.status(404).json({ success: true, message: "Post not found" });
    res.status(500).send("Server Error");
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    )
      return res
        .status(400)
        .json({ success: true, message: "This post is already liked" });

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post is liked",
      post: post.likes,
    });
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId")
      return res.status(404).json({ success: true, message: "Post not found" });
    res.status(500).send("Server Error");
  }
};

exports.unLikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    )
      return res
        .status(400)
        .json({ success: true, message: "This post has not been yet like" });

    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post is unlike",
    });
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId")
      return res.status(404).json({ success: true, message: "Post not found" });
    res.status(500).send("Server Error");
  }
};

exports.addComment = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(req.params.id);

    const newComment = {
      content: req.body.content,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };

    post.comments.unshift(newComment);

    await post.save();

    res.status(200).json({
      success: true,
      message: "Comment is added",
      comment: post.comments,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const comment = post.comments.find(
      (comment) => comment.id === req.params.commentId
    );

    if (post.user.toString() !== req.user.id)
      return res
        .status(401)
        .json({ success: true, message: "User not authorized" });

    if (!comment)
      return res
        .status(404)
        .json({ success: true, message: "Comment not found" });

    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.status(200).json({
      success: true,
      message: "Comment is deleted",
    });
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId")
      return res.status(404).json({ success: true, message: "Post not found" });
    res.status(500).send("Server Error");
  }
};

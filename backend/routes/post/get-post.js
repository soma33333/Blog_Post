const express = require("express");
const Post = require("../../models/Post");
const get_post = express.Router();

get_post.get("/getpost", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name");
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = get_post;

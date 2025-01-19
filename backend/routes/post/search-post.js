const express = require("express");
const Post = require("../../models/Post");

const search_post = express.Router();
const User = require("../../models/User");

search_post.post("/search", async (req, res) => {
  const { title, author } = req.body;

  try {
    let authorId = null;

    if (author) {
      const user = await User.findOne({ name: new RegExp(author, "i") });
      if (user) {
        authorId = user._id;
      }
    }

    const posts = await Post.find({
      $and: [{ title: new RegExp(title, "i") }, { author: authorId }],
    });

    if (posts.length === 0) {
      return res
        .status(404)
        .json({ message: "No posts found matching the criteria" });
    }

    res.json({
      message: "Posts found successfully",
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error("Search Error:", error);
    res
      .status(500)
      .json({ message: "Error while searching", error: error.message });
  }
});

module.exports = search_post;

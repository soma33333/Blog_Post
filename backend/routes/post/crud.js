const router_crud = require("express").Router();
const Post = require("../../models/Post");
const User = require("../../models/User");
const multer = require("multer");
const jwt = require("jsonwebtoken");

const uploadmiddelware = multer({ dest: "uploads/" });

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, "secretkey", (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

router_crud.post(
  "/upload",
  authenticateToken,
  uploadmiddelware.single("image"),
  async (req, res) => {
    const { title, summary } = req.body;

    const author = req.user.id;
    res.json({ files: req.file });
    const postdoc = await Post.create({
      title,
      summary,
      image: req.file.path,
      author,
    });
  },
);

router_crud.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is protected data", user: req.user });
});

router_crud.get("/post/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("author", "name");
    res.status(200).json({ post, user: req.user });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router_crud.put(
  "/post/:id",
  authenticateToken,
  uploadmiddelware.single("image"),
  async (req, res) => {
    const { title, summary } = req.body;
    const postId = req.params.id;
    const author = req.user.id;

    try {
      const post = await Post.findByIdAndUpdate(
        postId,
        {
          title,
          summary,
          image: req.file ? req.file.path : undefined,
          author,
        },
        { new: true },
      );

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json({ message: "Post updated successfully", post });
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
);

router_crud.delete("/post/:id", authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router_crud;

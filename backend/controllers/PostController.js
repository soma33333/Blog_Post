const Post = require("../models/Post");
const User = require("../models/User");
const multer = require("multer");
const jwt = require("jsonwebtoken");




const createPost = async (req, res) => {
    try {
      const { title, summary } = req.body;
      const Contributer = req.user.id; 
  
     
      if (!req.file) {
        return res.status(400).json({ message: 'Image file is required' });
      }
  
      // Create a new post with the provided details
      const postdoc = await Post.create({
        title,
        summary,
        image: req.file.path,
        Contributer,
      });
  
      res.status(201).json({ message: 'Post created successfully', post: postdoc });
    } catch (error) {
      res.status(500).json({ message: 'Error creating post', error });
    }
  };



  const update_post = async (req, res) => {
    const { title, summary } = req.body;
    const postId = req.params.id;
    const user = req.user.id;
    const updateFields = {};
  
    if (title) updateFields.title = title;
    if (summary) updateFields.summary = summary;
    if (req.file) updateFields.image = req.file.path;
  
    try {
      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: "No data to update" });
      }
  
      const post = await Post.findByIdAndUpdate(
        postId,
        { ...updateFields, user },
        { new: true }
      );
  
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      res.json({ message: "Post updated successfully", post });
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  





const getpost_byid= async (req, res) => {
    const { id } = req.params;
    try {
      const post = await Post.findById(id).populate("Contributer", "name");
      res.status(200).json({ post, Contributer: req.user });
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};



const delete_postbyid=async (req, res) => {
    console.log("ghjk")
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== req.user.id) {
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
};



const  get_post= async (req, res) => {
    try {
        const posts = await Post.find().populate("Contributer", "name");
        res.status(200).json(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Internal server error" });
      }
  };
  


  const search_post=async (req, res) => {
    const { title, Contributer } = req.body;
  
    try {
      let ContributerId = null;
  
      if (Contributer) {
        const user = await User.findOne({ name: new RegExp(Contributer, "i") });
        if (user) {
          ContributerId = user._id;
        }
      }
  
      const posts = await Post.find({
        $and: [{ title: new RegExp(title, "i") }, { Contributer: ContributerId }],
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
  };


module.exports={createPost,get_post,getpost_byid,update_post,delete_postbyid,search_post}
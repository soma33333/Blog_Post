const mongoose = require('mongoose');

// Define the Post schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  summary: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String, // This can store the file path or URL of the uploaded image
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  },
});

// Create a Post model from the schema
const Post = mongoose.model('Post', postSchema);

module.exports = Post;

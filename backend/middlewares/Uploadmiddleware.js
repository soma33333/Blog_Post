const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig'); // import the Cloudinary config
const multer = require('multer');

// Create Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Folder name where images will be stored in Cloudinary
    allowedFormats: ['jpg', 'jpeg', 'png', 'gif'], // Supported formats
  },
});

const uploadMiddleware = multer({ storage });

module.exports = { uploadMiddleware };

// backend/index.js

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./routes/auth.js');

const app = express();
app.use('/uploads', express.static('uploads'));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Allow credentials
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use Routes
app.use('/api/auth', routes); // Use /api as the base URL for all routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

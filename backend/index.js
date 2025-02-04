const express = require("express");
const cors = require("cors");
const http = require("http");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

connectDB();

const app = express();
const server = http.createServer(app); // ✅ Create HTTP server

app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Import routes
const User_router = require("./routes/UserRouter");
const Post_router = require("./routes/PostRouter");
const  Comment_router=require("./routes/CommentRouter")
app.use("/api", User_router);
app.use("/api", Post_router);
app.use("/api",Comment_router);




const PORT = process.env.PORT || 5000;
server.listen(PORT, () => { // ✅ Use `server.listen` instead of `app.listen`
  console.log(`Server is running on port ${PORT}`);
});

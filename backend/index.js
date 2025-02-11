const express = require("express");
const cors = require("cors");
const http = require("http");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
require("dotenv").config();
connectDB();

const app = express();
const server = http.createServer(app); 

app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true, 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());

app.get("/check",(req,res)=>{
  res.send("ya its working")
})

// Import routes
const User_router = require("./routes/UserRouter");
const Post_router = require("./routes/PostRouter");
const  Comment_router=require("./routes/CommentRouter")
app.use("/api", User_router);
app.use("/api", Post_router);
app.use("/api",Comment_router);




const PORT = process.env.PORT 
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
connectDB();
const app = express();
app.use("/uploads", express.static("uploads"));
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());


const User_router=require("./routes/UserRouter")
const Post_router=require("./routes/PostRouter")
app.use("/api",User_router)
app.use("/api",Post_router)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

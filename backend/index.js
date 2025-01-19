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

const register = require("./routes/user/register.js");
const login = require("./routes/user/login.js");
const logout = require("./routes/user/logout.js");
const change_password = require("./routes/user/change-password.js");

const get_post = require("./routes/post/get-post.js");
const search_post = require("./routes/post/search-post.js");
const router_crud = require("./routes/post/crud.js");

app.use("/api/user", register);
app.use("/api/user", login);
app.use("/api/user", logout);
app.use("/api/user", change_password);

app.use("/api/post", get_post);
app.use("/api/post", search_post);
app.use("/api/post", router_crud);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

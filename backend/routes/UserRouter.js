const express = require("express");
const User_router = express.Router();
const { Register,Login,setpassword,generate_Otp,Logout, login_status} = require("../controllers/UserController"); // Corrected import
const {authenticateToken}=require("../middlewares/Authtoken")

User_router.post("/register", Register);
User_router.post("/login",Login)
User_router.post("/setpassword",setpassword)
User_router.post("/get-otp",generate_Otp)
User_router.post("/logout",Logout)
User_router.get("/loginstatus",authenticateToken,login_status)
module.exports = User_router;

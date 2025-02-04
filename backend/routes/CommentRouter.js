const express = require("express");
const Comment_router = express.Router();
const {addcomment,getcomment, delete_comment}=require("../controllers/CommentController")


Comment_router.post("/comment",addcomment);
Comment_router.get("/getcomment/:id",getcomment);
Comment_router.delete("/delete_comment/:id",delete_comment);

module.exports=Comment_router

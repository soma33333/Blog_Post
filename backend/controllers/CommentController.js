const Comment=require("../models/Comment")

const addcomment=async(req,res)=>{
    const { postId, userId, content } = req.body;
    try {
      const comment = new Comment({ postId, userId, content });
      await comment.save();
      res.status(201).json({ message: "Comment added successfully", comment });
    } catch (err) {
      res.status(500).json({ message: "Failed to add comment", error: err });
    }
}
  
  const getcomment=async(req,res)=>{
    try {
        const comments = await Comment.find({ postId: req.params.id }).populate('userId', 'name');
        res.status(200).json({ comments });
      } catch (err) {
        res.status(500).json({ message: "Failed to fetch comments", error: err });
      }
  }

const delete_comment=async(req,res)=>{
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "comment not found" });
    }
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }

}


  module.exports={addcomment,getcomment,delete_comment}
  
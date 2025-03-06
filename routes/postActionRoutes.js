const express = require("express");
const router = express.Router();
const {
  PostLikeUpdateController,
} = require("../controllers/UpdateControllers/likeUpdateController");
// /updatelike/${postId}/${userId}
const posts = require("../models/postSchema");
const Comment = require("../models/commentSchema");
router.put("/updatelike/:postid/:userid", async (req, res) => {
  const { postid, userid } = req.params;
  console.log(userid);
  try {
    const toUpdatePost = await posts.findOneAndUpdate(
      { _id: postid },
      { $inc: { likes: 1 }, $addToSet: { likedBy: userid } }, // Increment likes by 1
      { new: true } // Return the updated document
    );
    console.log(toUpdatePost.likedBy);
    return res.json({ msg: "post liked successfully", post: toUpdatePost });
  } catch (e) {
    console.log(e);
    return res.json({ error: "error likeing the post" });
  }
});
// commentedBy:[{
//     commentedUserId:{type :  mongoose.Schema.Types.ObjectId},
//     comment:{type:String},
//     commentedAt: { type: Date, default: Date.now }
// }]
// router.post("/postcomment", async (req, res) => {
//     try {
//         const { postId, userId, comment } = req.body;

//         const updatedPost = await posts.findOneAndUpdate(
//             { _id: postId },
//             {
//                 $push: {
//                     commentedBy: {
//                         commentedUserId: userId,
//                         comment: comment,
//                         commentedAt: new Date(), // Adding timestamp
//                     },
//                 },
//             },
//             { new: true } // Returns updated document
//         );

//         if (!updatedPost) {
//             return res.status(404).json({ error: "Post not found" });
//         }

//         res.status(200).json({ message: "Comment added successfully", updatedPost });
//     } catch (error) {
//         console.error("Error adding comment:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

router.post("/postcomment", async (req, res) => {
    try {
      const { postId, userId, comment } = req.body;
  
      if (!postId || !userId || !comment) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const newComment = await Comment.create({
        postId: postId,
        author: userId,
        comment: comment,
        commentedAt: new Date(), // Corrected timestamp
      });
  
      return res
        .status(201)
        .json({ msg: "Comment posted successfully", comment: newComment });
    } catch (error) {
      console.error("Error posting comment:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });




//   const fetchCommentsForPost =

router.get("/getcomments/:postId", async (req, res) => {
    const { postId } = req.params;
    console.log(postId)
    if(!postId){
        console.log("No postId included")
        return res.status(404).json({error:"No postId included"})

    }
    try{
       const comments =  await Comment.find({ postId }).populate("author", "name profilePhotoUrl")
       return res.status(200).json({comments})
    }catch(e){
        console.error("Error fetching comment:", e);
        return res.status(500).json({ error: "Internal server error" }); 
    }
} )

module.exports = router;

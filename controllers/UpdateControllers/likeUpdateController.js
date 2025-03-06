const  posts = require("../../models/postSchema");
// const posts = require("/models/postSchema")

exports.updateLike = async (req, res) => {
    const { postid, userid } = req.params;
    try{
        const toUpdatePost = await posts.findOneAndUpdate(    { _id: postid },
            { $inc: { likes: 1 } }, // Increment likes by 1
            { new: true } // Return the updated document
            )
        return res.json({msg:"post liked successfully", post:toUpdatePost})
    }catch(e){
        console.log(e)
        return res.json({error:"error likeing the post" })
    }
}
const Post = require("../models/postSchema")

exports.fetchPost = async (req,res) =>{
    // fetch all the post 
    // 
    try{
        const posts = await Post.find();
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
        return res.status(201).json({msg:"post fetched successfully ..." , posts:posts})
    } catch(e){
        console.log(e, "Error  fetching the posts")
        return res.status(404).json({error:"Error  fetching the posts"})
    }
}
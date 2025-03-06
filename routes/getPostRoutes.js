const express =  require("express")
const Post = require("../models/postSchema")
const { getPostController } =  require("../controllers/getPostController")
// const  getPostController  =  require("../controllers/getPostController")
const router = express.Router()

router.get("/feeds", async (req,res) =>{
    // fetch all the post 
    try{
        // const posts = await Post.find().limit(5).sort({createdAt:-1}).populate("userId");
        const posts = await Post.find().sort({createdAt:-1}).populate("userId");
        return res.status(201).json({msg:"post fetched successfully ..." , posts:posts})
    } catch(e){
        return res.status(404).json({error:"Error  fetching the posts"})
    }   
})

module.exports = router
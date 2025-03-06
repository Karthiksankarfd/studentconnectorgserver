const mongoose = require("mongoose")
// const { post } = require("../routes/postUploadRoutes")
const comment = require("../models/commentSchema")
commentedBy:[comment]
const postSchema = new mongoose.Schema({
    userId :{type :  mongoose.Schema.Types.ObjectId, ref:"User", required:true },
    imageUrl: [{ type: String, required: true }], // S3 URL for post image
    caption: { type: String },
    createdAt: { type: Date, default: Date.now },
    likes:{type:Number,default:0},
    likedBy:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}], 
    
    commentedBy:[{
        commentedUserId:{type :  mongoose.Schema.Types.ObjectId},
        comment:{type:String},
        commentedAt: { type: Date, default: Date.now }
    }]
})

// USING VIRTUAL FOR LIKE 
// postSchema.virtual("likes").get(function(){
//     return this.likedBy.length
// })

// USING VIRTUAL FOR LIKE 
// postSchema.virtual("comments").get(function(){
//     return this.commentedBy.length
// })

// creating modal by using user schema 
const Post = mongoose.model("Post", postSchema)

module.exports = Post;
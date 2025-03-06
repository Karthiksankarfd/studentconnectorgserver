const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    // type :  mongoose.Schema.Types.ObjectId, ref:"User", required:true 
    postId :{type: mongoose.Schema.Types.ObjectId, ref:"Post",required:true},
    author:{type: mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    // profilePhotoUrl :{type},
    comment:{type:String},
    commentedAt: { type: Date, default: Date.now }
})

const comment = mongoose.model("Comments", commentSchema )

module.exports = comment
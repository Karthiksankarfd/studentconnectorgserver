const Post = require("../models/postSchema");
const uploadPostMiddleware = require("../middleware/S3ForPost");
const User = require("../models/userSchema");
const multer = require('multer');
const upload = multer().fields([{ name: "postImages", maxCount: 10 }]);

exports.uploadPostcontroller =async (req, res) => {
  console.log("HITTED THE POST API")
  const { userId, maxCount, caption } = req.body;
  console.log(req.body)
  try {
    if (!req.files || !req.files.postImages) {
      return res.status(400).json({ msg: "No files uploaded" });
    }

    const uploadedFiles = req.files.postImages;
    const imageUrl = uploadedFiles.map((file) => file.location);

    const newPost = new Post({
      userId,
      caption,
      imageUrl,
      likedBy: [],
      commentedBy: [],
      createdAt: new Date(),
    });

    await newPost.save();

    await User.updateOne({ _id: userId }, { $push: { posts: newPost._id } });

    res.status(201).json({ msg: "Post uploaded successfully", post: newPost });
  } catch (e) {
    res.status(500).json({ msg: "Error uploading post", error: e.message });
  }
}
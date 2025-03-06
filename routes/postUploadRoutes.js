const express =require("express")

const router = express.Router();

const {uploadPostcontroller}= require("../controllers/postUploadController")
const multer = require("multer");

const uploadPostFields = require("../middleware/S3ForPost");
router.post("/uploadPost",uploadPostFields.fields([{name:"postImages" , maxCount:10}]), uploadPostcontroller)

module.exports = router;
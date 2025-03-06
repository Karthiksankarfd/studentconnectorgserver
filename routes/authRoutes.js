const express = require("express");
const { login, verifyToken, isEmailExist, createUser} = require("../controllers/authControllers");
const tokenMiddleware = require("../middleware/verifyToken");
const upload = require("../middleware/S3")

// const  = require("../controllers/authControllers")
const router = express.Router();

// Login route
router.post("/login", login);

router.post("/verifytoken",tokenMiddleware, verifyToken );

router.post("/isMailExist", isEmailExist )

router.post("/signupandcreateuser", upload ,createUser)  

module.exports = router;


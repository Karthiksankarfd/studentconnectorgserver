const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const jwt = require("jsonwebtoken");

let secret = "karthik@123";

exports.login = async (req, res) => {
  try {
    const { email, reqpassword } = req.body;
    // Find user by email
    const userData = await User.findOne({ email }).select("+password");

    if (!userData) {
      return res.status(404).json({ msg: "oops! No user found with the provided email" });
    }

    // Verify password
    const isvalidPassword = await bcrypt.compare(
      reqpassword,
      userData.password
    );

    if (!isvalidPassword) {
      console.log("Invalid password")
      return res.status(401).json({ msg: "Invalid password" });
    }

    // Removing password from user object data
    const { password, ...userWithoutPassword } = userData.toObject();

    // Creating JWT token
    const payload = { userId: userData._id }; // Use proper payload structure

    const token = jwt.sign(payload, secret, { expiresIn: "24h" });

    console.log("Log in successful");
    return res.status(201).json({
      user: userWithoutPassword,
      msg: "User details found",
      authtoken: token,
    });
  } catch (e) {
    console.error("Error in login route:", e.message);
    return res.status(500).json({ error: e.message });
  }
};

exports.verifyToken = async (req, res) => {
  const { user } = req;

  try {
    const userData = await User.findOne({ _id: user.userId });
    // console.log(userData);

    console.log("Log in successful");
    return res.status(201).json({
      user: userData,
      message: "User details found",
      //   authtoken: token,
    });
  }catch (e) {
    console.error("Error in login route:", e.message);
    return res.status(500).json({ error: e.message });
  }
};

exports.isEmailExist = async (req, res) => {
  const email = req.headers.email;


  try {
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(409)
        .json({ msg: "A user already exist with the provided email !" });
    }

    return res
      .status(201)
      .json({
        msg: "No user found... continue signing up",
        useremail: email,
        step: 2,
      });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.createUser = async (req, res) => {
  // console.log(req.body); // Log the body data
  // console.log(req.files); // Log the uploaded files

  // Extract form data
  const { name, email, password, linkedInUrl, portfolioUrl, collegeUrl, githubUrl, areasInterestedIn,about } = req.body;

  // Extract file data from req.files
  const s3profilePhotoUrl = await req.files["profilePhoto"] ? req.files["profilePhoto"][0].location : null;
  const s3coverPhotoUrl =  req.files["coverPhoto"] ? req.files["coverPhoto"][0].location : null;

  try {
    const hashedPassword = await hashPassword(password, 10);
    const newUser = new User({
      name,
      email,
      about,
      password: hashedPassword,
      profilePhotoUrl: s3profilePhotoUrl,
      coverPhotoUrl: s3coverPhotoUrl,
      linkedInUrl: linkedInUrl || null,
      portfolioUrl: portfolioUrl || null,
      collegeUrl: collegeUrl || null,
      githubUrl: githubUrl || null,
      areasInterestedIn: areasInterestedIn || []
    });
    await newUser.save();
    console.log("Signup successful...");
    return res.status(201).json({ msg: "Signup successful...", user:newUser });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

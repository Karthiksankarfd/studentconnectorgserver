
const jwt = require("jsonwebtoken");
let secret = "karthik@123";

const verifyToken = async (req, res, next) => {
  const {token}=req.body

    if(token === ""){
        console.log("No token present")
        return;
    } 

  try {
    const decoded =  jwt.verify(token, secret)
    // console.log(decoded)
    req.user = decoded
    next()
  } catch (error) {
    // console.error("", error);
    return;

    // throw new Error("Invalid or expired token!"); // Throw error for the caller to handle
  }
};

module.exports = verifyToken;

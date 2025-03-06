const jwt = require("jsonwebtoken")
// ! how should we design the login system
//* step 1 -check for exixting token in local storage if token availble log the user if not ask for login 
const jwt = require("jsonwebtoken");

const decodeToken = (token) => {
    try {
        // Decoding the JWT without verifying its signature
        const decoded = jwt.decode(token);
        console.log("Decoded Token:", decoded);
        return decoded;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};



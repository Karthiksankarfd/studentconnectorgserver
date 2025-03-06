const express = require("express")
const router = express.Router()
const { searchController } = require("../controllers/searchController")
const User = require("../models/userSchema")
// router.get("/search" , searchController)
router.get("/search", async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(404).json({ error: "No Query found" })
    }
    try {
        const searchResult = {
            people: await User.find({ name: { $regex: query, $options: "i" } }),
            //  result2: await Post.find({name:{$regex : query , $options :"i"}})
        }
        console.log(searchResult)
        return res.status(200).json({ searchResult })
    } catch (e) {
        console.log(e, "error in fecthing data from the collections")
    }
})



//         const express = require("express");
// const { getUserByQuery } = require("../controllers/userController");

// const router = express.Router();

// Route: Fetch user by category and ID
router.get("/getdataonquery", async (req, res) => {
    console.log("Hitted getdataonquery api")
    try {
        const { category, _id } = req.query;
        console.log(category, _id)
        if (!category || !_id) {
            return res.status(400).json({ message: "Category and ID are required." });
        }

        const user = await User.findOne({ _id });
        console.log("This from line 42",user)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

       return res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
    }
});



module.exports = router;
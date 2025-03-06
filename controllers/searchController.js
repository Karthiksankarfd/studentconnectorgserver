const Post = require("../models/postSchema")
const User =  require("../models/userSchema")

exports.searchQuery = async (req, res)=>{
const {query} = req.query; 

    if(!query){
        return res.status(404).json({error:"No Query found"})
    }
    try{
        const searchResult =  { result1: await User.find({name:{$regex : query , $options :"i"}}),
        //  result2: await Post.find({name:{$regex : query , $options :"i"}})
        }
        console.log(searchResult)
        return res.status(200).json({result : searchResult })
    }catch(e){
            console.log(e, "error in fecthing data from the collections")
    }
}


// const User = require("../models/User");

// // Fetch user data based on category and ID
// const getUserByQuery = async (req, res) => {
//   try {
//     const { category, _id } = req.query;

//     if (!category || !_id) {
//       return res.status(400).json({ message: "Category and ID are required." });
//     }

//     const user = await User.findOne({ _id, category });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = { getUserByQuery };

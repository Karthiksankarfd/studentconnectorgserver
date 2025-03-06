const mongoose = require('mongoose');
// const uri = "mongodb://localhost:27017/"
// mongodb+srv://karthik:<db_password>@cluster-one.buuxkm3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-one
// mongodb+srv://karthik:Database@123887@<cluster_name>.mongodb.net/studentconnect?retryWrites=true&w=majority
// Replace with your MongoDB username and URL-encoded password
const username = "karthik";
const password = encodeURIComponent("p10MXExNf0EBSnks"); // URL-encode if it contains special characters
const clusterUrl = "cluster-one.buuxkm3.mongodb.net"; //  MongoDB Atlas cluster URL
const database = "studentconnect"; //  database name
// mongodb+srv://<db_username>:<db_password>@cluster-one.buuxkm3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-one
// mongodb+srv://karthik:p10MXExNf0EBSnks@cluster-one.buuxkm3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-one

const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/${database}?retryWrites=true&w=majority&appName=Cluster-one`;

// const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/${database}?retryWrites=true&w=majority`;
const connectDb = async ()=>{
    try{
        // await mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology: true,})
        await mongoose.connect(uri)
        console.log("Connected to MongoDB")
    }catch(e){
        console.log( "Error connecting to Mongodb : ",e)
    }
}

module.exports = connectDb;
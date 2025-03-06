const Job = require("/models/jobsSchema")

exports.getJobs = async(req, res)=>{
    // list the jobs based on filte category - job tittle
    // this same api should be used for fetching the data based on filter category
    const queryParam = req.params.title;
    const jobs =await Job.find(queryParam ? { title: queryParam } : {})
   
}
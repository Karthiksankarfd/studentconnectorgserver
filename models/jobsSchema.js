const mongoose = require("mongoose")


// {
//     "id":"0005",
//     "title": "Digital Marketing Specialist",
//     "companyImage":"https://media.licdn.com/dms/image/v2/C560BAQHxbR20oGIx9g/company-logo_100_100/company-logo_100_100/0/1631384889565?e=1744848000&v=beta&t=V2yYtgK5XpIMebkJqVEdjQIIM4Aunrd19-YRpN_8i3A",
//     "about": "We are looking for a Digital Marketing Specialist to develop, implement, and manage marketing campaigns that promote our products and services.",
//     "type": "Job",
//     "workTime": "Full-Time",
//     "company": "Brandify",
//     "city": "Mumbai",
//     "state": "Maharashtra",
//     "country": "India",
//     "applyLink": "https://brandify.com/careers/digital-marketing",
//     "postedOn": "2025-01-13",
//     "responsibilities": [
//       "Plan and execute digital marketing campaigns",
//       "Monitor and report on the performance of all digital marketing campaigns",
//       "Manage social media platforms and increase brand awareness",
//       "Work with the content team to create engaging content"
//     ],
//     "experienceRequired": "2+ years of experience in digital marketing",
//     "skillsRequired": ["SEO", "Google Analytics", "Content Marketing", "Social Media"],
//     "salaryRange": "₹5,00,000 - ₹10,00,000 per annum",
//     "education": "Bachelor's degree in Marketing or related field",
//     "workMode": "Remote"
//   }
// ? creating thenew instance of the mongoose schema 
const jobSchema = new mongoose.Schema({
    userId :{type :  mongoose.Schema.Types.ObjectId, ref:"User", required:true },
    title: { type: String, required: true },
    // this should be the profile url of the company
    companyImage: { type: String, required: true },
    about: { type: String, required: true },
    type: { type: String, required: true },
    workTime: { type: String, required: true },
    company: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    applyLink: { type: String, required: true },
    postedOn: { type: Date, required: true },
    responsibilities: { type: [String], required: true },
    experienceRequired: { type: String, required: true },
    skillsRequired: { type: [String], required: true },
    salaryRange: { type: String, required: true },
    education: { type: String, required: true },
    workMode: { type: String, required: true }
})

// creating modal by using user schema 
const Job = mongoose.model("Job", jobSchema )

// exporting the schema 
module.exports = Job
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true, // remove white space
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,

    // validate: {
    //   validator: function (v) {
    //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Basic email validation regex
    //   },
    //   message: "Invalid email format",
    // },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    select: false, // Ensures password is not returned in queries by default
  },
  profilePhotoUrl: {
    type: String,
    default: "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Images.png", // A default image URL
  },
  coverPhotoUrl: {
    type: String,
    default: "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg", // A default image URL
  },
  about:{type:String ,default:"No about is provided"},
  posts:[{type :  mongoose.Schema.Types.ObjectId, ref:"Post", required:true}],
  linkedInUrl:{type:String, default:null},
  portfolioUrl:{type:String, default:null},
  collegeUrl:{type:String, default:null},
  githubUrl:{type:String, default:null},
    areasInterestedIn: {
    type: [String],
    default: [],  // Ensures it's initialized as an empty array
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },


});

// Middleware to update the `updatedAt` field automatically
// userSchema.pre('save', function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

const User = mongoose.model('User', userSchema);

module.exports = User;

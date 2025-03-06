const bcrypt = require("bcrypt")



const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);
    console.log(hashed)
    return hashed;
  }

// hashPassword("Karthik@123").then((data)=>console.log(data))

const comparePassword = async(inputPassword, storedhasedPassword)=>{
    const isvalid = await bcrypt.compare(inputPassword,storedhasedPassword)
    return isvalid ;
}

module.exports = {hashPassword,comparePassword}


// const bcrypt = require('bcrypt');

// const password = 'mySecretPassword';
// const saltRounds = 10;

// // Encode Password
// bcrypt.hash(password, saltRounds, (err, hash) => {
//   if (err) throw err;

//   console.log('Hashed Password:', hash);

//   // Compare Password
//   bcrypt.compare(password, hash, (err, result) => {
//     if (err) throw err;
//     console.log('Password Match:', result); // true
//   });
// });

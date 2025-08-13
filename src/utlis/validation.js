const validator = require('validator')

const validateSignUpData = (req) =>{
 const {firstName,lastName,email,password} = req.body 
 if(!firstName || !lastName){
    throw new Error("Enter the name");
 }
 else if(!validator.isEmail(email)){
  throw new Error("Invalid Email :Enter the valid Email");
 }
 else if(!validator.isStrongPassword(password)){
 throw new Error("Enter Strong Password");
 }
}

module.exports = {validateSignUpData}
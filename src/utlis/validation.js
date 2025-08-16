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

const validateEditProfile = (req) =>{
   const allowedEditFields = ["photoUrl","age","skills","gender","firstName","lastName","about"]

   const isAllowedEditFields = Object.keys(req.body).every((field)=>allowedEditFields.includes(field))
   
   return isAllowedEditFields
}

const validateForgetPasswordData = (req) =>{
   const {newPassword}=req.body
 if(!validator.isStrongPassword(newPassword)){
 throw new Error("Enter Strong New Password");
 }
}

module.exports = {validateSignUpData,validateEditProfile,validateForgetPasswordData}
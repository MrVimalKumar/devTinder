const express = require('express')
const {User}=require("./models/user")
const {connectDB} = require('./Config/database')
const {validateSignUpData} = require('./utlis/validation')
const bcrypt = require('bcrypt')
const validator = require('validator')

const app = express();

// Middleware which is needed for all the API to read Body
// This helps to convert all the json to javascript objects
app.use(express.json())

// SignUp API
app.post("/signup", async (req,res)=>{
    const {firstName,lastName,email,password}=req.body
    try{
        // validate the Data
         validateSignUpData(req)
        //  Encrypting the password
        const passwordHash = await bcrypt.hash(password,10)
        // Creating a New User instance & storing new user in DB
        const user = new User({
            firstName,
            lastName,
            email,
            password : passwordHash,
        })
        await user.save();
        res.send("SignUp Successfull")
    }catch(err){
        res.status(400).send("ERROR : " + err.message)
    }
})

// Login API
app.post("/login",async (req,res)=>{
    const {email,password}= req.body
    try{

    if(!validator.isEmail(email)){
        throw new Error("Enter the valid Email")
    }
    const user = await User.findOne({email:email})
    if(!user){
        throw new Error("Invalid Credentials")
    }
    // Comparing the passwords using bcrypt
    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(isPasswordValid){
        res.send("Login Successfull")
    }else{
        throw new Error("Invalid Credentials")
    }
    }
    catch(err){
        res.status(400).send("ERROR : "+ err.message)
    }
    
})

// Get one user by Email
app.get("/user",async (req,res)=>{
    const userEmail = req.body.email
    try{
      const user = await User.find({email:userEmail})
    res.send(user)  
    }catch(err){
        res.status(400).send("User not found")
    }   
})
// Get all the user - Feed API.
app.get("/users", async (req,res)=>{
    try{
        const users = await User.find({});
        res.send(users)
    }catch(err){
        res.status(400).send("Something went Wrong")
    }
})

// Delete the Particular user from DB.
app.delete("/user",async (req,res)=>{
     const deleteuserEmail = req.body.email
     try{
        const user = await User.findOneAndDelete(deleteuserEmail)
        res.send("User Deleted Successfully")
     }catch(err){
        res.status(400).send("Something went wrong")
     }
})

// update the user data by using email
app.patch("/user/:userEmail",async (req,res)=>{
    const userEmail = req.params.userEmail
    const data = req.body
 try{
    const Allowed_Updates = ["photoUrl","about","gender","age","skills"]
    const isUpdatedAllowed = Object.keys(data).every((k)=>Allowed_Updates.includes(k))
    if(!isUpdatedAllowed){
        throw new Error("Update not allowed")
    }
    const user = await User.findOneAndUpdate({email:userEmail},data, {returnDocument:"after", runValidators:true})
    console.log(user)
    res.send("User Updated")
 }catch(err){
    res.status(400).send("Update Failed : "+ err.message )
 }
    

})

connectDB().then(()=>{
    console.log("Database Connected Successfully");
    app.listen(3000, ()=>{
    console.log("Server is running...")
    })
}).catch((err)=>{
    console.log("Database is not connect Successfully")
})


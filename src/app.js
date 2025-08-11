const express = require('express')
const {User}=require("./models/user")
const {connectDB} = require('./Config/database')

const app = express();

// Middleware which is needed for all the API to read Body
// This helps to convert all the json to javascript objects
app.use(express.json())

app.post("/signup", async (req,res)=>{
    const user = new User(req.body)
    try{
    await user.save();
        res.send("Data saved in DB Successfully")
    }catch(err){
        res.status(400).send("Data is not saved")
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
app.patch("/user",async (req,res)=>{
    const userEmail = req.body.email
    const data = req.body
    const user = await User.findOneAndUpdate({email:userEmail},data, {returnDocument:"after", runValidators:true})
    console.log(user)
    res.send("User Updated")

})

connectDB().then(()=>{
    console.log("Database Connected Successfully");
    app.listen(3000, ()=>{
    console.log("Server is running...")
    })
}).catch((err)=>{
    console.log("Database is not connect Successfully")
})


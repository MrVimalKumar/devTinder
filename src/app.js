const express = require('express')

const {User}=require("./models/user")

const app = express();

const {connectDB} = require('./Config/database')

app.post("/signup", async (req,res)=>{
    const user = new User({
        firstName:"Vimal",
        lastName:"Kumar",
        email:"Vimal@gmail.com",
        password:"Vimal..00",
        age:21
    });

    await user.save();
    res.send("Data saved in DB Successfully")

})

connectDB().then(()=>{
    console.log("Database Connected Successfully");
    app.listen(3000, ()=>{
    console.log("Server is running...")
    })
}).catch((err)=>{
    console.log("Database is not connect Successfully")
})


const express = require('express')

const app = express();

const {adminAuth,userAuth} = require('./middleware/auth')

app.use("/admin", adminAuth)

app.post("/user/login",(req,res)=>{
    res.send("Login Sucess")
})

app.get("/user/getdata",userAuth,(req,res)=>{
    res.send("Get all the Data");
})

app.delete("/user/deletedata",userAuth,(req,res)=>{
    res.send("Deleted the data");
})

app.get("/admin/getdata",(req,res)=>{
    res.send("Get all the Data");
})

app.delete("/admin/deletedata",(req,res)=>{
    res.send("Deleted the data");
})

app.listen(3000, ()=>{
    console.log("Server is running...")
})
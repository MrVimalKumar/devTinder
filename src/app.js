const express = require('express')

const app = express();

app.use("/",(req,res)=>{
    res.send("Dev Tinder Dashboard")
})

app.use("/test",(req,res)=>{
    res.send("Testing Dev Tinder ")
})
app.use("/test1",(req,res)=>{
    res.send("Testing Dev Tinder API 1")
})

app.listen(3000, ()=>{
    console.log("Server is running...")
})
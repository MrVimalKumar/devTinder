const express = require('express')

const app = express();

app.get("/user",(req,res,next)=>{
    // res.send({firstname:"Vimal",lastname:"kumar"});
    next();
},(req,res,next)=>{
    console.log("This is 2nd route handler")
    next();
},(req,res,next)=>{
   console.log("3rd Route handler") 
   next();
},(req,res,next)=>{
    console.log("4th route handler")
    next();
},(req,res,next)=>{
    console.log("5th route handler")
    res.send("Response from 5th route handler ")
})

app.listen(3000, ()=>{
    console.log("Server is running...")
})
const express = require('express')

const app = express();

app.get("/user",(req,res)=>{
    res.send({firstname:"Vimal",lastname:"kumar"});
})

app.post("/user",(req,res)=>{
    // Saved Data to Database.
    res.send("Data saved in Database Successfully...")
})

app.delete("/user",(req,res)=>{
    // Saved Data to Database.
    res.send("Data is deleted in database")
})

app.listen(3000, ()=>{
    console.log("Server is running...")
})
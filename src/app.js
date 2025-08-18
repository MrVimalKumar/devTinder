const express = require('express')
const {connectDB} = require('./Config/database')
const cookieParser = require('cookie-parser')

const app = express();

const {authRouter}=require('./routes/auth')
const {profileRouter}=require('./routes/profile')
const {requestRouter}= require('./routes/request')

// Middleware which is needed for all the API to read Body
// This helps to convert all the json to javascript objects

app.use(express.json())
app.use(cookieParser())

app.use("/",authRouter)
app.use("/", profileRouter)
app.use("/",requestRouter)

connectDB().then(()=>{
    console.log("Database Connected Successfully");
    app.listen(3000, ()=>{
    console.log("Server is running...")
    })
}).catch((err)=>{
    console.log("Database is not connect Successfully")
})


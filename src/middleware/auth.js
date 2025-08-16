const jwt = require('jsonwebtoken')
const {User}=require('../models/user')

const userAuth = async(req,res,next)=>{
   try{
    const {token}=req.cookies;
    if(!token){
        throw new Error("Invalid Token")
    }
    const decodedData = await jwt.verify(token,"DevTINDER@123")
    const {_id} = decodedData
     const user = await User.findById(_id);
    if(!user){
        throw new Error("user doesn't exit")
    }
    req.user = user
    next()
    }catch(err){
    res.status(400).send("ERROR : " + err.message)
   }    
}

module.exports={
    userAuth
}
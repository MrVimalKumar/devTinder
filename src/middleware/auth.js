const jwt = require('jsonwebtoken')
const {User}=require('../models/user')

const userAuth = async(req,res,next)=>{
   try{
    const {token}=req.cookies;
    if(!token){
        throw new Error("Please Login")
    }
    const decodedData = await jwt.verify(token,process.env.JWT_SECERT)
    const {_id} = decodedData
     const user = await User.findById(_id);
    if(!user){
        throw new Error("user doesn't exit")
    }
    req.user = user
    next()
    }catch(err){
    res.status(401).send("ERROR : " + err.message)
   }    
}

module.exports={
    userAuth
}
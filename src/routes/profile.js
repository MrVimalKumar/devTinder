const express = require('express')
const profileRouter = express.Router()
const {userAuth}=require('../middleware/auth')
const {validateEditProfile,validateForgetPasswordData} = require('../utlis/validation')
const bcrypt = require('bcrypt')
const {User}=require("../models/user")

profileRouter.get("/profile",userAuth,async (req,res)=>{
    try{
        const user = req.user
        res.send(user)
    }catch(err){
        res.status(400).send("ERROR : " + err.message)
    }
})

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        if(!validateEditProfile){
            throw new Error("Invalid Edit Request")
        }
        const loggedInUser = req.user
        Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]))
        await loggedInUser.save()
        res.json({message:`${loggedInUser.firstName},Successfully updated`,data:loggedInUser})
    }catch(err){
         res.status(400).send("ERROR : " + err.message)
    }
})

profileRouter.patch("/profile/forgetpassword",userAuth, async(req,res)=>{
    try{
        validateForgetPasswordData(req)
        const {oldPassword,newPassword }= req.body;
        const user = req.user
        const isPasswordValid = await bcrypt.compare(oldPassword,user.password)
        if(isPasswordValid){
                user.password = await bcrypt.hash(newPassword,10)
                await user.save()
                res.send("Password Changed Success full")
        }
        else{
            throw new Error("Invalid Credentials")
        }
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message)
    }
        
})

module.exports={profileRouter}

const express = require('express')
const { userAuth } = require('../middleware/auth')
const { ConnectionRequestModel } = require('../models/connectionrequest')
const { User } = require('../models/user')
const requestRouter = express.Router()

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try{
        const fromUserId = req.user._id
        const toUserId = req.params.toUserId
        const status =req.params.status
        // Checking the status is valid or invalid
        const allowedStatus = ["interested","ignored"]
        if(!allowedStatus.includes(status)){
            return res.json({
                message :`{VALUE} is incorrect status type `
            })
        }
        // Whether you are sending connection request to yourself.
        if(toUserId == fromUserId){
             return res.json({
                message :`You cant send connection to yourself`
            })
        }
        // Checking whether the toUser is already in DB.
        const toUser = await User.findById(toUserId)
        if(!toUser){
            return res.json({
                message :`User not found`
            })
        }
        //  Checking whether the Connection is already exist or not
        const existingConnectionRequest = await ConnectionRequestModel.findOne({
            $or:[{fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ]})
        if(existingConnectionRequest){
            return res.json({
                message:`Connection already exsits`
            })
        }

        const connections = new ConnectionRequestModel({
                fromUserId,
                toUserId,
                status
            })
        await connections.save()
        res.send("Connection sent successfully")

    }catch(err){
        res.status(400).send("ERROR : "+err.message)
    }
})

module.exports = {requestRouter}
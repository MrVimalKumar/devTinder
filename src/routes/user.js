const express = require('express')
const userRouter = express.Router()
const { userAuth } = require('../middleware/auth')
const { ConnectionRequestModel } = require('../models/connectionrequest')
const { User } = require('../models/user')

const USER_SAFE_DATA = ["firstName","lastName","photoUrl","skills","about","age","gender"]


userRouter.get("/user/requests/received",userAuth,async (req,res)=>{
    try{
        const loggedInUser = req.user;
        
        const connectionRequests = await ConnectionRequestModel.find({
            toUserId : loggedInUser._id,
            status:"interested"
        }).populate("fromUserId",["firstName","lastName","photoUrl","age","about","gender"])
        const data = connectionRequests
        res.json({
            message:"Data fetched successfully...",
            data
        })
        }catch(err){
        res.status(400).send("ERROR : "+ err.message)
    }    
})

userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user._id

        const connections = await ConnectionRequestModel.find({
            $or:[
                {toUserId:loggedInUser,status:"accepted"},
                {fromUserId:loggedInUser,status:"accepted"}
            ]
        }).populate("fromUserId",["firstName","lastName","photoUrl"]).populate("toUserId",["firstName","lastName","photoUrl"])
        const data = connections.map((row)=>{
            if(row.fromUserId._id.toString() == loggedInUser.toString()){
                return row.toUserId
            }else{
                 return row.fromUserId
            } 
        })
        res.json(data)
    }catch(err){
        res.status(400).send("ERROR : "+ err.message)
    }
})

userRouter.get("/feed",userAuth,async(req,res)=>{
    try{
         const loggedInUser=req.user
    // find all the connections (sent +received)
    const connectionrequests = await ConnectionRequestModel.find({
        $or:[{toUserId:loggedInUser._id},{fromUserId:loggedInUser._id}]
    }).select("formUserId toUserId").populate("fromUserId","firstName").populate("toUserId","firstName")
    
    // hideUsersFromFeed

    const hideUsersFromFeed = new Set()
    connectionrequests.forEach((ele)=>{
        hideUsersFromFeed.add(ele.fromUserId._id.toString());
        hideUsersFromFeed.add(ele.toUserId._id.toString())
    })
    
    // Feed users
    const users = await User.find({
        $and:[
           {_id:{$nin : Array.from(hideUsersFromFeed)}  },
           {_id :{$ne:loggedInUser._id}}
        ] 
    }).select(USER_SAFE_DATA)
    res.send(users)
    
    }catch(err){
        res.status(400).send("ERROR : "+ err.message)
    }
   
})

module.exports={userRouter}
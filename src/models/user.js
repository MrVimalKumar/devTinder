const {Schema,model} = require('mongoose')


const userSchema = new Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    age:{
        type:Number
    }
})

module.exports = model("User",userSchema)
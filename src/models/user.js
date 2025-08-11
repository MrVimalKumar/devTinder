const {Schema,model} = require('mongoose')


const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    photoUrl:{
        type:"String",
        default:"https://www.clipartmax.com/middle/m2H7G6H7K9H7H7A0_admin-blank-user-profile/",
    },
    password:{
        type:String
    },
    skills:{
        type:[String],
    },
    about:{
        type:String,
        default:"This is default about"
    },
    age:{
        type:Number,
        min :18
    },
    gender:{
        type:String,
        Validate(value){
            if(!["male","female","others".includes(value)]){
                throw new Error("Gendr is not defined")
            }
        }
    }
},{timestamps:true})

const User = model("User",userSchema)

module.exports = {User}
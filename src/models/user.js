const {Schema,model} = require('mongoose')
const validator = require('validator')


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
        validate(value){
            if(! validator.isEmail(value)){
                throw new Error("Invalid Email "+ value)
            }
        }
    },
    photoUrl:{
        type:"String",
        default:"https://www.clipartmax.com/middle/m2H7G6H7K9H7H7A0_admin-blank-user-profile/",
        validate(value){
            if(!validator.isURL(value)){
                throw new Errror("Invalid URL"+ value)
            }
        }
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
const mongoose = require('mongoose')

const connectDB = async() =>{
    await mongoose.connect("mongodb+srv://DevTinder:Vimal..00@devtinder.gqufdpj.mongodb.net/devTinder");
};

module.exports={connectDB}
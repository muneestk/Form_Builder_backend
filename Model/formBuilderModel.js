import mongoose from "mongoose";

const userScheema = new mongoose.Schema({
    name:{
        type:String,
        required:true     
    },
    email:{
        type:String,
        required:true,
        unique:true     
    },
    phone:{
        type:Number,
        required:true     
    },
    password:{
        type:String,
        required:true     
    },
})

const userModel = mongoose.model('user',userScheema)
export default userModel
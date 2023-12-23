import mongoose from "mongoose";

const formScheema = new mongoose.Schema({
    formName:{
        type:String,
        required:true     
    },
    userId:{
        type:String,
        required:true     
    },
    formFields:[

    ],
    formSubmitted:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'formsubmitted'
        }
    ]
})

const formModel = mongoose.model('form',formScheema)
export default formModel
import mongoose from "mongoose";

const formRegisterScheema = new mongoose.Schema({
    formName:{
        type:String,
        required:true     
    },
    formId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'form',
        required:true        
    },
    formData:[

    ]
})

const formRegisterModel = mongoose.model('formsubmitted',formRegisterScheema)
export default formRegisterModel

import bcrypt from 'bcryptjs'
import userModel from '../Model/formBuilderModel.js'
import  Jwt  from 'jsonwebtoken'
import formModel from '../Model/forms.js'
import formRegisterModel from '../Model/registeredForms.js'

export const registerFormBuilder = async(req,res) => {
    try{
        const {name,email,phone,password} = req.body
        const securePasswoerd = await bcrypt.hash(password,10)

        const checkuser = await userModel.findOne({email:email})

        if(checkuser) return res.status(400).json({message:'Email already registerd'})

        const userData = new userModel({
            name,email,phone,
            password:securePasswoerd
        })

        const token = Jwt.sign({userId:userData._id},process.env.SECRETKEY)

        userData.save().then(()=>{
            return res.status(200).json({
                message:'Registration compleeted succesfully',
                token
            })
        })
    }catch(error){
        console.log(error)
    }

}


export const loginFormBuilder = async(req,res) => {
    try{
        const { email,password } = req.body

        const checkuser = await userModel.findOne({email:email})

        if(!checkuser) return res.status(400).json({message:'Email not registerd'})

        if(await bcrypt.compare(password,checkuser.password)){
            const token = Jwt.sign({userId:checkuser._id},process.env.SECRETKEY)
            return res.status(200).json({token})
        }else{
            return res.status(400).json({
                message:'password incorrect'
            })
        }

        
    }catch(error){
        console.log(error.message)
    }

}



export const saveForm = async(req,res) => {
    try{

    const {
            form,
            formName: { name },
            id
          } = req.body        

        const formData = new formModel({
            formName:name,
            userId:id,
            formFields:form
        })

        await formData.save().then(()=>{
            return res.status(200).json({
                message:'Form saved successfully'
            })
        })

   
       
    }catch(error){
        return res.status(400).json({
            message:'Form save failed'
          })  
        console.log(error.message)
    }

}




export const registerForm = async(req,res) => {
    try{

        const {formId,form,formName}=req.body

        const formData = new formRegisterModel({
            formName,
            formId,
            formData:form
        })

        const formDataSave = await formData.save();
        if(formDataSave){
            await formModel.updateOne({ _id: formId }, { $addToSet: { formSubmitted: formData._id } });
            return res.status(200).json({
                message:'Form submitted succesfuly'
              })
        }else{
            return res.status(400).json({
                message:'Form save failed'
              })   
        } 
    }catch(error){
        console.log(error.message)
    }

}



export const editForm = async(req,res) => {
    try{

        const {formId,form}=req.body
        const formDataSave = await formModel.updateOne({ _id: formId }, { $set: { formFields: form } });
 
        if(formDataSave){
            return res.status(200).json({
                message:'Form edited succesfuly'
              })
        }else{
            return res.status(400).json({
                message:'Form edit failed'
              })   
        } 
        
    }catch(error){
        console.log(error.message)
    }

}


export const getForms = async(req,res) => {
    try{
        const { id } = req.params        
        const formData = await formModel.find({userId:id})
        if(formData){
            return res.status(200).json(formData)
        }else{
            return res.status(400).json({
                message:'Please Login'
              })  
        }
       
    }catch(error){       
        console.log(error.message)
    }

}


export const getSingleForms = async(req,res) => {
    try{
        const { id } = req.params        
        const formData = await formModel.findById(id).populate('formSubmitted')
        if(formData){
            return res.status(200).json(formData)
        }else{
            return res.status(400).json({
                message:'Please Login'
              })  
        }
       
    }catch(error){       
        console.log(error.message)
    }

}




export const deleteSingleForm = async(req,res) => {
    try{
        const { id } = req.params 
        const formData = await formModel.findByIdAndDelete(id)
        if(formData){
            await formRegisterModel.deleteMany({formId:id})
            return res.status(200).json({
                message:'Form deleted succesfully'
            })
        }else{
            return res.status(400).json({
                message:'Form deletion failed'
              })  
        }
       
    }catch(error){       
        console.log(error.message)
    }

}
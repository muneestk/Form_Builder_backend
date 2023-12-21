
import bcrypt from 'bcryptjs'
import userModel from '../Model/formBuilderModel.js'
import  Jwt  from 'jsonwebtoken'

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
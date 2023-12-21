import  Express  from "express";
import cors from 'cors'
import route from "./Route/route.js";
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const app = Express()

app.use(Express.json())
app.use(Express.urlencoded({extended:true}))

app.use(cors({
    origin: process.env.FRONTEND,
    credentials:true
}))

app.use('/',route)

mongoose.connect(process.env.MONGO).then(()=>
    console.log('mongodb connected')
).catch((error)=>
    console.log('error mongodb connected'+error)
)


app.listen(process.env.PORT,()=>{
    console.log('server running on port '+ process.env.PORT)
})
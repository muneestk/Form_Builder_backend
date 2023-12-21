import express from 'express'
import { loginFormBuilder, registerFormBuilder } from '../Controller/controller.js'

const route = express()

route.post('/register',registerFormBuilder)
route.post('/login',loginFormBuilder)

export default route
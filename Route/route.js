import express from 'express'
import { deleteSingleForm, editForm, getForms, getSingleForms, loginFormBuilder, registerForm, registerFormBuilder, saveForm } from '../Controller/controller.js'

const route = express()

route.post('/register',registerFormBuilder)
route.post('/login',loginFormBuilder)
route.post('/saveForm',saveForm)
route.post('/registerForm',registerForm)
route.patch('/editForm',editForm)
route.get('/getForms/:id',getForms)
route.get('/getSingleForm/:id',getSingleForms)
route.delete('/deleteForm/:id',deleteSingleForm)

export default route
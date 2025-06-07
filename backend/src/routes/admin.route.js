import express from 'express'

import AdminController from '../controllers/admin.controller.js'

const adminRouter = express.Router()

adminRouter.post('/createNewUser', AdminController.createNewUser)
adminRouter.post('/getData', AdminController.getData)

export default adminRouter
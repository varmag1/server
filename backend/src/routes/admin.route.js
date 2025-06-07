import express from 'express'

import AdminController from '../controllers/admin.controller.js'

const adminRouter = express.Router()

adminRouter.get('/createNewUser',  AdminController.createNewUser)
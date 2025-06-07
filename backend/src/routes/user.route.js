import express from "express"
import UserController from '../controllers/user.controller.js'

const router = express.Router()

router.post('/register', UserController.registration)
router.post('/login', UserController.login)

export default router
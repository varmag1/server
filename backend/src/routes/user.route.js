import express from "express"
import { getRegister, postRegister } from '../controllers/user.controller.js'

const router = express()

router.get('/register', getRegister)
router.post('/register', postRegister)

export default router
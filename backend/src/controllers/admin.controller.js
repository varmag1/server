import AdminModel from "../models/admin.model.js";
import bcrypt from 'bcryptjs'

export default class AdminController {
    static async createNewUser (req, res) {
        try {
            const { username, password } = req.body
            const id = Date.now()
            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = new AdminModel({ 
                username,
                password : hashedPassword,
                id
                })
            await newUser.save()
            res.json({ 
                status: "Success", 
                message: 'User created successfully' 
            })
        } catch (error) {
            
        }
    }
}
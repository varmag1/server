import AdminModel from "../models/admin.model.js";
import bcrypt from 'bcryptjs'

export default class AdminController { 
    static async createNewUser (req, res) {
        try {
            const { username, password, role, adminKey } = req.body;
            
            if (adminKey !== process.env.ADMIN_KEY) {
                return res.status(403).json({
                    status: "Error",
                    message: "Invalid admin key"
                });
            }
            const newUser = await AdminModel.createNewUser({ username, password, role });
            res.json({ 
                status: "Success", 
                message: 'User created successfully',
                user: newUser
            });
        } catch (error) {
            res.json({
                status: "Error",
                message: error.message
            });
        }
    }

    static async getData(req, res) {
        try {
            const { username } = req.body;
            const userData = await AdminModel.getData(username);
            if (!userData) {
                return res.status(404).json({
                    status: "Error",
                    message: "User not found"
                });
            }
            res.json({
                status: "Success",
                data: userData
            });
        } catch (error) {
            res.status(500).json({
                status: "Error",
                message: error.message
            });
        }
    }
}
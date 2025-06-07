import adminSchema from './schemas/Admin.js';
import bcrypt from 'bcryptjs';


export default class AdminModel {
    static async createNewUser({ email, username, password, role }) {
        const id = Date.now();
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new adminSchema({
            email,
            username,
            password: hashedPassword,
            role,
            id
        });
        await newAdmin.save();
        return newAdmin;
    }

    static async getData(username) {
        const userData = await adminSchema.findOne({ username });
        if (!userData) return null;
        return {
            email: userData.email,
            id: userData.id,
            password: userData.password,
            role: userData.role,
            createdAt: userData.createdAt
        };
    }

    static async findUser(username) {
        try {
            const user = await adminSchema.findOne({ email: username });
            
            if (!user) {
                throw new Error("User not found");
            }
            
            return user;
        } catch (error) {
            console.error("Error finding user:", error);
            throw error;
        }
    }
}
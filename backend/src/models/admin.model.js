import schema from './schemas/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class AdminModel {
    static async createNewUser({ username, password, role }) {
        const id = Date.now();
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new schema({
            username,
            password: hashedPassword,
            role,
            id
        });
        await newUser.save();
        return newUser;
    }

    static async getData(username) {
        const userData = await schema.findOne({ username });
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
            const user = await schema.findOne({ email: username });
            
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
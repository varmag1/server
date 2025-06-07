import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import AdminModel from '../models/admin.model';

export default class Auth {

    static async generateToken(user) {
        const token = jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: 3 * 24 * 60 * 60,
        })
        return token
    };

    static async verifyToken(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return { message: "No authorization header" };
            }

            const token = authHeader.split(" ")[1];
            if (!token) {
                return { message: "No token provided" };
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded) {
                return { message: "Invalid token" };
            }

            req.userid = decoded.id;
            req.userRole = decoded.role;
            next();

        } catch (error) {
            next(error);
        }
    };
    
    static async validateUser(username, password) {
        try {
            const user = await AdminModel.findOne({ username: username }).lean();

            if (!user) {
                return { 
                    status: "error",
                    message: "User not found" 
                };
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return { 
                    status: "error",
                    message: "Invalid password" 
                };
            }

            const userWithoutPassword = { ...user };
            delete userWithoutPassword.password;

            const token = await this.generateToken(userWithoutPassword);

            return {
                status: "success",
                data: {
                    ...userWithoutPassword,
                    token
                }
            };

        } catch (error) {
            console.error('Error validating user:', error);
            return { 
                status: "error", 
                message: "Internal server error" 
            };
        }    
    }
}
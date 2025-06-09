import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import AdminModel from '../models/admin.model.js';

export default class Auth {

    static generateTokens(user) {
        const payload = {
            id: user._id,
            role: user.role,
            username: user.username,
        };

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '15m',
        });

        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '7d',
        });

        return { accessToken, refreshToken };
    };

    static async refreshAccessToken(req, res) {
        try {
            const { refreshToken } = req.body;

            if (typeof refreshToken !== "string" || !refreshToken.trim()) {
                return res.status(400).json({ message: 'Refresh token is missing or invalid' });
            }

            let decoded;
            try {
                decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            } catch (err) {
                return res.status(403).json({ message: 'Invalid refresh token' });
            }

            const user = await AdminModel.findById(decoded.id).lean();

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const payload = {
                id: user._id,
                role: user.role,
                username: user.username,
            };

            const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '15m',
            });

            return res.json({ accessToken });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    static async validateUser(username, password) {
        try {
            const user = await AdminModel.findOne({ username }).lean();

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

            const tokens = this.generateTokens(user);

            return {
                status: "success",
                data: {
                    id: user._id,
                    username: user.username,
                    role: user.role,
                    ...tokens
                }
            };
        } catch (error) {
            console.error('Error validating user:', error);
            return {
                status: "error",
                message: "Internal server error"
            };
        }
    };

    static async verifyToken(req, res, next) {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                return res.status(401).json({ message: "No authorization header" })
            }

            const token = authHeader.split(" ")[1];

            if (!token) {
                return res.status(401).json({ message: "No token provided" })
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.userid = decoded.id;
            req.userRole = decoded.role;
            req.username = decoded.username;

            next();

        } catch (error) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
    };

}
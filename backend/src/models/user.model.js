import schema from './schemas/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class UserModel {
    static async registration({ email, username, password }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new schema({ email, username, password: hashedPassword });
        const savedUser = await newUser.save();
        return savedUser;
    }

    static async login({ username, password }) {
        const user = await schema.findOne({ username });
        if (!user) return null;
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { user, token };
    }
}

import UserModel from '../models/user.model.js';

export default class UserController {

    static async registration(req, res) {
        try {
            const { email, username, password } = req.body;
            const savedUser = await UserModel.registration({ email, username, password });
            res.status(201).json(savedUser);
        } catch (error) {
            res.status(500).json({ message: 'Registration failed', error });
        }
    };

    static async login(req, res) {
        try {
            const { username, password } = req.body;
            const result = await UserModel.login({ username, password });
            if (!result) {
                return res.status(401).json({ message: 'Authentication failed' });
            }
            res.json({ message: "Logged in succefully", token: result.token });
        } catch (error) {
            res.status(500).json({ message: 'Login failed', error });
        }
    }
}

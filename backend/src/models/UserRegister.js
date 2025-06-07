import mongoose from "mongoose";

const Schema = mongoose.Schema;
const UserRegisterSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: false})

const Register = mongoose.model("UserRegister", UserRegisterSchema)
export default Register
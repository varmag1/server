import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
}, {timestamps: false})

const schema = mongoose.model("AdminSchema", AdminSchema)

export default schema
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const DB = process.env.MONGO_CONNECT

const connectDB = () => {
    try {
        mongoose.connect(DB)
        console.log('Connect to MongoDB')
    } catch (error) {
        console.log(`Error MongoDB: ${error}`)
    }
}

export default connectDB;
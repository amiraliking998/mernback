import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const connectDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected to db")
    } catch (error) {
        console.log(error, "DB ERROR")
    }
}

export default connectDB;
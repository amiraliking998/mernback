import mongoose, { Schema } from "mongoose";

const User = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: ""
    }
}, { timestamps: true }
)

// creating model in db
const userModel = mongoose.models.user || mongoose.model("user", User)
// exporting model
export default userModel;
import mongoose, { Schema } from "mongoose";

const Todo = Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true })

// creating model in db
const todoModel = mongoose.models.todo || mongoose.model("todo", Todo)
// exporting model
export default todoModel; 
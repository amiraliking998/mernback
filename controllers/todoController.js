import todoModel from "../models/Todo.js";
import userModel from "../models/User.js";

const addTodo = async (req, res) => {
    const { title } = await req.body;
    const user_id = await req.user.userId
    const user = await userModel.findById({ _id: user_id })
    if (!user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    else {
        try {
            await todoModel.create({ title, user });
            res.status(201).send({
                status: 201,
                message: "Todo successfully added"
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }
}

const getTodo = async (req, res) => {
    const user_id = await req.user.userId
    const user = await userModel.findById({ _id: user_id })
    if (!user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    else {
        try {
            const Todo = await todoModel.find({ user: user_id });
            res.status(200).send({
                status: 200,
                todo: Todo,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }
}
const deleteTodo = async (req, res) => {
    const user_id = await req.user.userId
    const todo_id = await req.params.id
    const user = await userModel.findById({ _id: user_id })
    if (!user) {
        return res.status(401).send({
            status: 401,
            message: 'User not authenticated'
        });
    }
    else {
        try {
            await todoModel.findByIdAndDelete(todo_id);
            res.status(200).send({
                status: 200,
                message: "Todo deleted successfully"
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }
}
const updateTodo = async (req, res) => {
    const user_id = await req.user.userId
    const todo_id = await req.params.id
    const { title } = await req.body
    const user = await userModel.findById({ _id: user_id })
    if (!user) {
        return res.status(401).send({
            status: 401,
            message: 'User not authenticated'
        });
    }
    else {
        try {
            await todoModel.findByIdAndUpdate(todo_id, { title }, { new: true });
            res.status(200).send({
                status: 200,
                message: 'Todo updated successfully!',
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }
}
export { addTodo, getTodo, deleteTodo, updateTodo }
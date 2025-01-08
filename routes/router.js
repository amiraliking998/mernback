import express from 'express'
import { logout, userLogin, userSignUp } from '../controllers/userController.js';
import { addTodo, deleteTodo, getTodo, updateTodo } from '../controllers/todoController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

// Auth Routes
router.post("/user-signup", userSignUp)
router.post("/user-login", userLogin)
router.get("/logout", logout)
// Todo Routes
router.post("/add-todo", verifyToken, addTodo)
router.get("/get-todo", verifyToken, getTodo)
router.delete("/delete-todo/:id", verifyToken, deleteTodo)
router.put("/update-todo/:id", verifyToken, updateTodo)
// Export router
export default router;
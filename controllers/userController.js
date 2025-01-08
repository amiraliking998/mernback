import userModel from "../models/User.js"
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()
// user sign up
const userSignUp = async (req, res) => {
    const { name, email, password } = await req.body
    const hashPass = await bcrypt.hash(password, 12)
    try {
        const user = await userModel.findOne({ email })
        if (user) {
            return res.status(409).send({
                status: 409,
                message: "Email is already in use please try another one"
            })
        }
        else {
            await userModel.create({ name, email, password: hashPass })
            res.status(201).send({
                status: 201,
                message: "User registered successfully"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 500,
            message: "Something went wrong please try again later!"
        })
    }
}
// user login
const userLogin = async (req, res) => {
    const { email, password } = await req.body
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                status: 404,
                message: "User not found"
            })

        }
        const match = await bcrypt.compare(password, user.password)
        if (match) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
            const tokenData = {
                token: token,
                _id: user._id,
                email: user.email,
                name: user.name
            };

            res.cookie('token', tokenData, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: false,
            })
            res.status(200).send({
                status: 200,
                message: "User logged in successfully",
            })
        } else {
            return res.status(401).send({
                status: 401,
                message: "Invalid credentials"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 500,
            message: "Something went wrong please try again later!"
        })
    }
}
// Log out user
const logout = async (req, res) => {
    res.clearCookie('token')
    res.status(200).send({
        status: 200,
        message: "User logged out successfully"
    })
}
export { userSignUp, userLogin, logout }
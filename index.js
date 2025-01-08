// Imports
import express from 'express'
import connectDB from './DB/connection.js';
import router from './routes/router.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { verifyToken } from './middlewares/verifyToken.js';
// Constants
connectDB()
const corsOptions = {
    origin: 'http://localhost:5173', // React app URL
    credentials: true, // Allow credentials
};
const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
// Api's end points
app.use('/api/auth', router)
app.use('/api/', router)
app.get('/check-token', verifyToken, async (req, res) => {
    const { message } = req
    if (message) {
        res.send({
            status: 401,
            message: message,
        })
    }
})
// Server
app.listen(3000, () => console.log("Server is running"))
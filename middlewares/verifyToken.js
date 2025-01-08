import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send({ error: "Token not provided" });
    }
    try {
        jwt.verify(token.token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).send({
                        status: 401,
                        message: "Token is expired"
                    });
                }
                else {
                    return res.status(401).send({
                        status: 401,
                        message: "Token is invalid"
                    })
                }
            }
            else {
                req.user = decode
                next()
            }
        })
    } catch (error) {
        console.log(error)
    }
}
export { verifyToken }
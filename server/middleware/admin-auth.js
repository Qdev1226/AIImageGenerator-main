import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const SECRET = process.env.SECRET;

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')
        if (token == undefined)
            return res.status(401).json({ msg: 'No Token' });

        const isCustomAuth = token.length < 500
        let decodeData;

        // If token is custom token do this
        if (token && isCustomAuth) {
            decodeData = jwt.verify(token, SECRET)
            req.userId = decodeData?.id
        } else {
            // Else of token is google token then do this
            decodeData = jwt.decode(token)
            req.userId = decodeData?.sub
        }

        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ msg: 'Token is not valid' });
    }
}

export default auth
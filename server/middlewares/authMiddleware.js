import jwt  from "jsonwebtoken";
import User from "../models/User.model.js";
import logger from "../utilities/logger.js";

const protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch(err) {
            res.status(401)
            logger.error('Error ' + err.message);
        }
    }

    if(!token) {
        res.status(401)
        logger.error('No Token');
    }
}

export default protect;
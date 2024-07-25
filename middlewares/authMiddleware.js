const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userVerification = async(req, res, next)=>{
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }
    const token = authHeader.split(' ')[1];

    try{
        const data = jwt.verify(token, process.env.TOKEN_KEY);
        const { id, username } = data;

        const user = await User.findById(id);

        if (!user) {
            return { success: false, message: 'User not found' };
        }

        if (user.username !== username) {
            return { success: false, message: 'Invalid token: username mismatch' };
        }

        req.user = user;
        next();

    }catch(err){
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
        return res.status(500).json({ success: false, message: "Server error" });
    }

}

module.exports = { userVerification };
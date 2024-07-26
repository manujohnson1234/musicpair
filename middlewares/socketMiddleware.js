const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config;


const socketVerification = async(socket, next)=>{
    try {
        const token = socket.handshake.auth.token;

        if (!token) {
            console.log('No token provided');
            return next(new Error('Authentication error'));
        }

        const data = jwt.verify(token, process.env.TOKEN_KEY);
        const { id, username } = data;

        const user = await User.findById(id);

        if (!user) {
            console.log('User not found, please login');
            return next(new Error('Authentication error'));
        }

        socket.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        next(new Error('Authentication error'));
    }
}

module.exports = {socketVerification};
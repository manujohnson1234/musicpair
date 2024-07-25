require("dotenv").config();
const jwt = require("jsonwebtoken");

const createSecretToken = (id, username)=>{
    return jwt.sign({id, username}, process.env.TOKEN_KEY,{
        expiresIn: 3 * 24 * 60 * 60,
    })
}

module.exports = {createSecretToken};
const mongoose = require('mongoose');
require('dotenv').config();

const dbconnection = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL );
        console.log("Sucessfully connected to MongoDB");
    }catch(e){
        console.log("Unable to connect to MongoDB");
        console.log(e);
    }
};

module.exports = dbconnection;
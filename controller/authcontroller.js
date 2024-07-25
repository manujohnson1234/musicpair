const User = require('../models/userModel');
const {createSecretToken} = require('../utils/secretToken');
const bcrypt = require('bcrypt');

const signup =  async (req, res)=>{
    try{
        const { email, password, username} = req.body;

        const existingemail = await User.findOne({ email });
        const existingUser = await User.findOne({ username });

        if(existingUser){
            return res.status(200).json({message: "username already exists", success: false});
        }
        
        if(existingemail){
            return res.status(200).json({message: "email already exists", success: false});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          username,
          email,
          password: hashedPassword
        });

        await newUser.save();
        res.status(200).json({ message: "User signedup  successfully", success: true,username});

    }catch(error){
        res.status(500).json({message: "error occured!"});
        console.error(error);
    }
    

}

const login = async (req, res)=>{
    try{
       const {password, email} = req.body;
    
       const user = await User.findOne({ email });

       if(!user){
        return res.status(200).json({message: "invalid email", success: false});
       }

       const auth = await bcrypt.compare(password,user.password);

       if (!auth) {
        return res.status(200).json({message:'Incorrect password', success: false}); 
      }

      const token = createSecretToken(user._id, user.username);

      res.status(200).json({ message: "User logged in successfully", success: true, token,"user":user.username});
        
    }catch(error){
        console.log(error);
        res.status(500).json({message : "server error"});
    }
}





module.exports = {signup, login};
const express = require('express');
const passport = require('passport');
const {signup, login} = require('../controller/authController');
const router = express.Router();
const { createSecretToken } = require('../utils/secretToken');
const { userVerification } = require('../middlewares/authMiddleware');
require('../controller/oauthController');


router.post('/signup', signup);
router.post('/login',login);

router.get('/', (req, res)=>{
    res.send('<a href="/.api/auth/google"> Authenticate with google </a>')
});

router.get('/auth/google', passport.authenticate('google', {scope: ['email','profile']}));

router.get('/auth/google/callback', (req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error', success: false });
        }
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed', success: false });
        }

        const token = createSecretToken(user._id, user.username);
        return res.status(200).json({
            message: 'User logged in successfully',
            success: true,
            token,
            username: user.username
        });
    })(req, res, next);
});


router.get('/home', userVerification, (req, res)=>{
    res.status(200).json({'message': 'hello'}); 
})

module.exports = router;
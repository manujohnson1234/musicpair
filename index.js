const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./controller/oauthController'); 
const dbconnection = require('./db/dbConnect');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbconnection();

app.use(session({
    secret: 'cats', 
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/.api', require('./routes/router'));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

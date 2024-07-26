const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./controller/oauthController'); 
const dbconnection = require('./db/dbConnect');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const {socketVerification} = require('./middlewares/socketMiddleware');

require('dotenv').config();


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


const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // not for production
        methods: ["GET", "POST"]
    }
});

io.use(socketVerification);


io.on('connection', (socket) => {
    console.log(`a user connected ${socket.id}`);

    io.emit('message', 'world');

});

app.use('/.api', require('./routes/router'));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Socket.io server is running on http://localhost:${PORT}`);
});

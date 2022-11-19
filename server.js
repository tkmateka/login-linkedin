const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = 3000;
const http = require('http').createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Web Sockets
const io = require('socket.io')(http, {
    transports: ['websocket', 'polling'],
    cors: {
        origins: ['*']
    }
});

io.on('connection', (socket) => {
    console.log('a user connected...');

    socket.on('message', (message) => {
        console.log(message);
        io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected!');
    });
});

// Routes
app.get('/callback', (req, res) => {
    io.emit('message', req.query.code);
    res.render('close.ejs');
});

http.listen(process.env.PORT || PORT, () => console.log("listening to port: " + PORT));
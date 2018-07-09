const path = require('path');
const publicPath = path.join(__dirname, '../public');
const http = require('http');
const socketIO = require('socket.io');
let {generateMessage} = require('./utils/message');

const port = process.env.PORT | 4444;

let express = require('express');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);


app.use(express.static(publicPath));


app.get('public');

io.on('connect', (socket) => {
    console.log('New user connected');
    
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user just joined'));

    socket.on('createMessage', (message) => {
        console.log(message);

        io.emit('newMessage', generateMessage(message.from, message.text, message.createdAt));   
    })
 
    socket.on('disconnect', () => {
        console.log('disconnected from server')
    });

});

server.listen(port, () => {
    console.log(`app listening on port ${port}`)
});
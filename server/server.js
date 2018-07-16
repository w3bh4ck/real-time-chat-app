const path = require('path');
const publicPath = path.join(__dirname, '../public');
const http = require('http');
const socketIO = require('socket.io');
let {generateMessage} = require('./utils/message');
const { isRealString } = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT | 4444;

let express = require('express');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();


app.use(express.static(publicPath));


app.get('public');

io.on('connect', (socket) => {
    console.log('New user connected');

   socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)){
      return callback('name and room name are required');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.getUser(socket.id, params.name, params.room);

    io.to(params.name).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} just joined`));
    callback();
   })
   
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
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT | 4444;

let express = require('express');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);


app.use(express.static(publicPath));


app.get('public');

io.on('connect', (socket) => {
    console.log("new user connected");


    socket.on('createMessage', (message) => {
        console.log('recieved message', message);

        io.emit('createMessage', {
            from: message.from,
            text: message.text
        });

    });
    socket.on('disconnect', () => {
        console.log('disconnected from server')
    });

});


server.listen(port, () => {
    console.log(`app listening on port ${port}`)
});
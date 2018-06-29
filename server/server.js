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

io.on('connection', (socket) => {
    console.log("connected");

    socket.on('disconnect', () =>{
        console.log('disconnected');   
    })

})

server.listen(port, ()=>{
    console.log(`app listening on port ${port}`);
})

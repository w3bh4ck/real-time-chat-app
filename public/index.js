let socket = io();


//action that can be performed on server connection
socket.on('connect', () => {
    console.log('connected to the server');
    


});

//server disconnection action

socket.on('disconnect', () => {
    console.log('Disconnected from server');
    
})

socket.on('newEmail', (email) => {
    console.log('New Email', email);
})


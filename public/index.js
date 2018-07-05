let socket = io();


//action that can be performed on server connection
socket.on('connect', () => {
console.log('connected to the server');
    
});

//server disconnection action

socket.on('disconnect', () => {
    console.log('Disconnected from server');
    
});



$('#message-form').on('submit', function(e){
    e.preventDefault();
    var message = $('[name=message]').val();    
    // console.log(message);
    
    socket.emit('createMessage', {
        from: 'user',
        text: message
    })
   
    e.target.reset();
})

socket.on('newMessage', (message) =>{
    let from = message.from;
    let text = message.text;

    $('#messages').append(`<li> ${from} : ${text} </li>`);
})




// socket.on('newEmail', (email) => {
//     console.log('New Email', email);
// });


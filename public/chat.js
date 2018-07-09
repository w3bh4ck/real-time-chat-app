let socket = io();

let scrollToBottom = () => {
    let messages = $('#messages');
    let  newMessage = messages.children('li:last-child');

    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }


}

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
    
    socket.emit('createMessage', {
        from: 'user',
        text: message,
        createdAt: new Date()
    })
   scrollToBottom();
    e.target.reset();
})

socket.on('newMessage', (message) =>{
    let template = $('#message-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: message.createdAt
    });
    $('#messages').append(html);
})

// let locationButton = $('#btn-location');
// locationButton.on('click', function(){
//    if(!navigator.geolocation){
//     return alert('You have to enable geolocation to use this feature');
//    }
//    function success(position){
//         console.log(position);      
//    }

//    function error(){
//       return alert('unable to fetch location');
//    } 
//    navigator.geolocation.getCurrentPosition(success, error);    
// });



// socket.on('newEmail', (email) => {
//     console.log('New Email', email);
// });


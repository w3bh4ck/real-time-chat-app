let socket = io();

let scrollToBottom = () => {
    let messages = $('#messages');
    let newMessage = messages.children('li:last-child');

    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

//action that can be performed on server connection
socket.on('connect', () => {
    let params = $.deparam(window.location.search);

    socket.emit('join', params, (err) => {
        if (err) {
            alert('Display Name and Room are Required');
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });

});

//server disconnection action
socket.on('disconnect', () => {
    console.log('Disconnected from server');

});



$('#message-form').on('submit', function (e) {
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

socket.on('updateUserList', (users) => {
    console.log('user list', users);
})

socket.on('newMessage', (message) => {
    let template = $('#message-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: message.createdAt
    });
    $('#messages').append(html);
})




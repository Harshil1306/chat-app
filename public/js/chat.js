const socket = io()

// socket.on('countUpdated', (count) => {
//     console.log('The count has been updated', count)
// })

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('clicked')
//     socket.emit('increment')
// })

socket.on('message', (message) => {
    console.log(message);
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (err) => {
        if(err) {
            return console.log(err)
        }
        console.log('The message was delivered!')
    })
});

document.querySelector('#send-location').addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {lat: position.coords.latitude, lon: position.coords.longitude}, () => {
            console.log('Location shared!')
        })
    })
})
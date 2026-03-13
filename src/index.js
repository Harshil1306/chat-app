const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app)
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath))

// let count = 0
io.on('connection', (socket) => {
    console.group('New WebSocket connection')

    // socket.emit('countUpdated', count)

    // socket.on('increment', () => {
    //     count++
    //     // socket.emit('countUpdated', count) This emits event to a specific connection
    //     io.emit('countUpdated', count) //This emits an event to all connections
    // })
    socket.emit('message', 'Welcome!')
    socket.broadcast.emit('message', 'A new user has joined!')

    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    })
})

server.listen(3000, () => {
    console.log('Server is up on port 3000');
})
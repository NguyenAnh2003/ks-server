// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Socket.IO connection event
io.on('connection', (socket) => {
    console.log('A new device connected');

    // Event for receiving device position updates
    socket.on('positionUpdate', (data) => {
        console.log('Position update received from device:', data);
        // Broadcast the position update to all connected devices except the sender
        socket.broadcast.emit('positionUpdate', data);
    });

    // Event for when a device disconnects
    socket.on('disconnect', () => {
        console.log('Device disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

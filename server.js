const express = require('express');
const app = express();
const server = require("http").Server(app)
const socketIO = require("socket.io")(server)
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('location', (location) => {
    console.log(location);
    socket.emit("location",location)
  });
  
  socket.on('disconnect', () => {
    socket.disconnect()
    console.log('🔥: A user disconnected');
  });
});
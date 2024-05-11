const express = require('express');
const app = express();
const server = require("http").Server(app)
const socketIO = require("socket.io")(server)
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});


var currentChildId;
socketIO.on('connection', (socket) => {
  
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('requestLocation', (childId) => {
    currentChildId=childId;
    console.log("request location child id sv "+childId);
    socketIO.sockets.emit('requestLocationToSpecificDevice',childId)
  });

  socket.on('locationChild', (locationChild,childId) => {
    console.log('Child id received:', childId);
    console.log('Location update received:', locationChild);
    console.log(currentChildId);
    console.log(childId);
    if(childId==currentChildId){
      socketIO.sockets.emit('locationUpdateToClient',locationChild)
    }
  });

  socket.on('disconnect', () => {
    socket.disconnect()
    console.log(`🔥: User ${socket.id} disconnected`);
  });
});
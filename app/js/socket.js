var socket = io.connect('http://localhost:3000');

// Add a connect listener
// socket.on('connection',function() {
//   console.log('Client has connected to the server!');
// });
// Add a connect listener
// socket.on('chat message',function(data) {
//   console.log('Received a message from the server!',data);
// });
// // Add a disconnect listener
// socket.on('disconnect',function() {
//   console.log('The client has disconnected!');
// });

// Sends a message to the server via sockets
function sendMessageToServer(message) {
  socket.send(message);
};

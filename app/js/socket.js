var socket = null;

function connect()
{
  socket = io.connect('http://localhost:1969');
  socket.emit('join', {user: document.getElementById("user-name").value});
  //socket.send(document.getElementById("user-name").value);
};

socket.on('new-user', function(data){
  alert('Called');
  for(var i = 0; i < data.length; i++)
  {
    alert('Called');
    $('#users').append($('<div class="col-sm-2">').text(data[i]));
  }
});

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

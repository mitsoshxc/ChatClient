var socket = null;

function connect() {
  socket = io.connect('http://localhost:1969');
  socket.emit('join', {user: document.getElementById("user-name").value});
  // alert('Connected');
  //socket.send(document.getElementById("user-name").value);

  socket.on('new-user', function(data) {
    for (var i = 0; i < data.length; i++) {
      // var dte = data[i];
      // for (var j = 0; j < dte.length; j++) {
        $('#users').append(('<div class="col-sm-2">').text(data[i]));
      // }
    }
  });
};

// Sends a message to the server via sockets
function sendMessageToServer(message) {
  socket.send(message);
};

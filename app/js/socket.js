var socket = null;
var iDiv = null;
var dDiv = null;
var aUser = null;

function connect() {
  socket = io.connect('http://localhost:1969');
  aUser = document.getElementById("user-name").value;
  socket.emit('join', {
    user: document.getElementById("user-name").value
  });

  socket.on('new-user', function(data) {
    dDiv = document.getElementById('users');
    while ( dDiv.firstChild ) dDiv.removeChild( dDiv.firstChild );

    data.forEach(function(element){
      iDiv = document.createElement("div");
      iDiv.id = 'user';
      iDiv.className = 'col-sm-2';
      document.getElementById('users').appendChild(iDiv);
      iDiv.innerHTML = '<p style="color:black;">' + element.name + '</p>'
    });
  });
};

// Sends a message to the server via sockets
function sendMessageToServer(message) {
  socket.send(message);
};

var socket = null;
var iDiv = null;
var dDiv = null;
var aUser = null;
var li = null;

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

  socket.on('new-message', function(data){
    li = document.createElement("li");

    if (data.user == aUser) {
      li.className = 'list-group-item text-right col-sm-12';
      li.innerHTML = data.message;
    }
    else {
      li.className = 'list-group-item col-sm-12';
      li.innerHTML = '<p>' + data.user + ',</p><p style="padding-left:10px;overflow:auto;">' + data.message + '</p>';
    }

    document.getElementById('messages').appendChild(li);
  });
};

function sendMessage(message)
{
  document.getElementById("message-text").value = '';
  // $('#messages').append($('<li class="list-group-item text-right">').text(message));
  socket.emit('chat-message', message);
};

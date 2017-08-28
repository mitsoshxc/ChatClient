var socket = null;
var aUser = null;

function connect() {
  try {
    socket = io.connect('http://technoserver.ddnsking.com:1969');
    aUser = document.getElementById("user-name").value;

    socket.emit('join', {user: document.getElementById("user-name").value});

    socket.on('new-user', function(data) {
      refreshUsers(data);

      if (data[data.length - 1].name !== aUser) {
        var li = document.createElement("li");
        li.style = 'background-color:#26DE1A;border:none;';
        li.className = 'list-group-item col-sm-12';
        li.innerHTML = '<p style="background-color:#26DE1A;border-radius:5px;">' + data[data.length - 1].name + '  connected!</p>';
        document.getElementById('messages').appendChild(li);

        scrollDown();
      }
    });

    socket.on('new-message', function(data) {
      var li = document.createElement("li");
      // if (data.user == aUser) {
      //   li.className = 'list-group-item text-right col-sm-12';
      //   li.innerHTML = data.message;
      // }
      // else {
      li.className = 'list-group-item col-sm-12';
      li.innerHTML = '<p style="color:#26DE1A;">' + data.user + ',</p>' + '<p style="padding-left:10px;overflow:auto;">' + data.message + '</p>';
      // }

      document.getElementById('messages').appendChild(li);

      scrollDown();
    });

    socket.on('user-left', function(user) {
      var li = document.createElement("li");
      li.style = 'background-color:#FF0000;border:none;';
      li.className = 'list-group-item col-sm-12';
      li.innerHTML = '<p style="background-color:#FF0000;color:#000000;border-radius:5px;">  ' + user + '  disconnected.</p>';
      document.getElementById('messages').appendChild(li);

      scrollDown();
    });

    socket.on('user-left-group', function(user) {
      var li = document.createElement("li");
      li.style = 'background-color:#FF5602;border:none;';
      li.className = 'list-group-item col-sm-12';
      li.innerHTML = '<p style="background-color:#FF5602;color:#000000;border-radius:5px;">  ' + user + '  left the room.</p>';
      document.getElementById('messages').appendChild(li);

      scrollDown();
    });

    socket.on('user-join-group', function(user) {
      var li = document.createElement("li");
      li.style = 'background-color:#26DE1A;border:none;';
      li.className = 'list-group-item col-sm-12';
      li.innerHTML = '<p style="background-color:#26DE1A;color:#000000;border-radius:5px;">  ' + user + '  joined the room.</p>';
      document.getElementById('messages').appendChild(li);

      scrollDown();
    });

    socket.on('refresh-users', function(users) {
      refreshUsers(users);
    });

    socket.on('send-whisper', function(data) {
      var li = document.createElement("li");
      li.className = 'list-group-item col-sm-12';
      li.innerHTML = '<p style="color:#E402FF;">Whisper from  <a href="#"' +
        ' style="text-decoration:none; color:#E402FF" onclick="sendWhisper(this)">' + data.user + '</a> ,</p>' + '<p style="padding-left:10px;overflow:auto;color:#E402FF">' + data.message + '</p>';
      document.getElementById('messages').appendChild(li);

      scrollDown();
    });

    return true;
  } catch (e) {
    alert(e.message);
    return false;
  }
}; //connect()

function sendMessage(message) {
  document.getElementById("message-text").value = '';
  socket.emit('chat-message', message);
  var li = document.createElement("li");
  li.className = 'list-group-item text-right col-sm-12';
  var spltres = message.split(' ');
  if (spltres[0] == '\\w') {
    var messageToView = spltres[2];
    for (var i = 3; i < spltres.length; i++) {
      messageToView += ' ' + spltres[i];
    }
    li.innerHTML = '<p style="color:#E402FF;">Whisper to <a href="#"' +
      ' style="text-decoration:none; color:#E402FF" onclick="sendWhisper(this)">' + spltres[1].slice(0, -1) + '</a> ,</p>' + '<p style="overflow:auto;color:#E402FF;">' + messageToView + '</p>'
  } else {
    li.innerHTML = message;
  }
  document.getElementById('messages').appendChild(li);

  scrollDown();
};

function groupChange(group) {
  socket.emit('group-change', group);
  var li = document.createElement("li");
  li.style = 'background-color:#00FFEC;border:none;';
  li.className = 'list-group-item col-sm-12';
  li.innerHTML = '<p style="background-color:#00FFEC;color:#000000;border-radius:5px;">  Moved to ' + group + '  room.</p>';
  document.getElementById('messages').appendChild(li);

  scrollDown();
};

function activate(element) {
  var groupItems = document.getElementsByClassName('group');

  for (i = 0; i < groupItems.length; i++) {
    groupItems[i].classList.remove('active');
  }

  element.classList.add('active');

  groupChange(element.text);
}

function refreshUsers(data) {
  var dDiv = document.getElementById('users');
  while (dDiv.firstChild) dDiv.removeChild(dDiv.firstChild);

  data.forEach(function(element) {
    iDiv = document.createElement("div");
    iDiv.id = 'user';
    iDiv.className = 'col-sm-2';
    document.getElementById('users').appendChild(iDiv);
    iDiv.innerHTML =
      '<p style="color:#000000;"><a href="#" style="text-decoration:none; color:#000000" ' +
      'onclick="sendWhisper(this)">' + element.name + '</a> : <span style="color:#FF0000">' +
      element.room + '</span></p>';
  });
}

function sendWhisper(element) {
  if (element.text !== aUser) {
    document.getElementById("message-text").value = '\\w ' + element.text + ': ';
    document.getElementById("message-text").focus();
  }
}

function scrollDown() {
  var scrdwn = document.getElementById("messages");
  scrdwn.scrollTop = scrdwn.scrollHeight;
}

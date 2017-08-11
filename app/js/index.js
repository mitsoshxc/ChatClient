var electron = require('electron');
var ipc = require('electron').ipcRenderer;

var currentWindow = electron.remote.getCurrentWindow();
var closeEl = document.getElementById("close");
var minimizeWindow = document.getElementById("minimize");
var maximizeWindow = document.getElementById("maximize");


closeEl.addEventListener('click', function () {
    ipc.send('close-main-window');
});

minimizeWindow.addEventListener('click', function()
  {
    ipc.send('minimize-main-window');
  });

maximizeWindow.addEventListener('click', function()
{
  if(currentWindow.isMaximized())
  {
    ipc.send('unmaximize-main-winodw');
    maximizeWindow.style.fontSize = "20px";
  }
  else
  {
    ipc.send('maximize-main-window');
    maximizeWindow.style.fontSize = "15px";
  }
});

document.getElementById("user-log-in").addEventListener('click', function()
{
  connect();
  document.getElementById("log-in-block").style.display = 'none';
  document.getElementById("main-block").style.display = 'block';
  document.body.style.background = "#47494c";
  document.getElementById("active-user").innerHTML = '<p>Hello ' + aUser + ',</p>';
});

document.getElementById("message-send").addEventListener('click', function(){
  //alert();
  sendMessage(document.getElementById("message-text").value);
});

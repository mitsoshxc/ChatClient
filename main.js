'use strict';

var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var ipc = require('electron').ipcMain;

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        frame: false,
        resize: false,
    });

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');
});

ipc.on('close-main-window', function () {
    app.quit();
});

ipc.on('minimize-main-window', function () {
    mainWindow.minimize();
});

ipc.on('unmaximize-main-winodw', function() {
    mainWindow.unmaximize();
});

ipc.on('maximize-main-window', function()
{
  mainWindow.maximize();
});

// mainWindow.on('enter-full-screen', function() {
//     console.log('entered full screen');
// });

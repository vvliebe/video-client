"use strict";
const {app, protocol, BrowserWindow} = require('electron')
const path = require('path')

var mainWindow = null;

app.commandLine.appendSwitch('ignore-gpu-blacklist', 'true');
app.commandLine.appendSwitch('enable-gpu-rasterization', 'true');
app.commandLine.appendSwitch('enable-zero-copy', 'true');
app.commandLine.appendSwitch('disable-software-rasterizer', 'true');

app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});
app.on('open-file', function (e, path) {
    if (mainWindow) {
        mainWindow.loadURL('file://' + __dirname + '/index.html#/watch/' + encodeURIComponent(path))
        mainWindow.show();
        mainWindow.focus();
    } else {
        openMainWindow(path);
    }
});
app.on('activate-with-no-open-windows', function () {
    if (mainWindow) {
        mainWindow.show();
    } else {
    }
});


app.on('ready', (event, launchinfo) => {
    openMainWindow()
});
function openMainWindow(vv = null) {
    // 自定义的local协议能够避开electron-compile的拦截策略，实现快速视频读取
    protocol.registerFileProtocol('local', (request, callback) => {
        const url = decodeURIComponent(request.url.substr(8)); // 注意解码
        if (url[0] == '/') {
            callback(path.normalize(url));
        }
        else {
            callback(path.normalize(`${__dirname}/${url}`));
        }
    }, (error) => {
        if (error) console.error('Failed to register protocol');
    })
    

    mainWindow = new BrowserWindow({ width: 1024, height: 768 });
    mainWindow.maximize();
    if (vv == null)
        mainWindow.loadURL('file://' + __dirname + '/index.html#/');
    else
        mainWindow.loadURL('file://' + __dirname + '/index.html#/watch/' + encodeURIComponent(vv))
    mainWindow.openDevTools();
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
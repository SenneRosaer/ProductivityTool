const {app, BrowserWindow, globalShortcut} = require('electron')

function createWindow() {
    win = new BrowserWindow({width:1600, height:1200})
    win.loadURL('http://localhost:3000/')
    win.removeMenu()
    win.webContents.debugger.attach('1.1')
    win.webContents.openDevTools()
    globalShortcut.register('f5', function(){
        win.reload()
    })
    globalShortcut.register('f12', function(){
        win.webContents.openDevTools()
    })
}

app.on('ready', function(){
    createWindow()
})
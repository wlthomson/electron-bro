const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs')

let win

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')

  win.on('closed', () => {
    win = null
  })
}

const saveReport = async (report) => {
  fs.writeFile('./report.json', JSON.stringify(report), (err) => { if (err) throw err; } )
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('call-saveReport', (_, report) => { 
  saveReport(report)
});
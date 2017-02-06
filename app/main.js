'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const crashReporter = electron.crashReporter;
const ipcMain = electron.ipcMain;

if(process.env.NODE_ENV === 'develop'){
  crashReporter.start();
}

const rootPath = `file://${__dirname}`;
let mainWindow = null;

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL(`${rootPath}/index.html`);
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("click-my-button", (sender, e) => {
  console.log(e);
});
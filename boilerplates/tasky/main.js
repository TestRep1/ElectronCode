const path = require('path');
const electron = require('electron');
const { BrowserWindow, app } = electron;
const AppTray = require('./app/AppTray');
const MainWindow = require('./app/MainWindow');

let mainWindow;
let tray;

app.dock.hide();
app.on('ready', () => {
    
    mainWindow = new MainWindow();
    mainWindow.loadFile('src/index.html');
    //mainWindow.loadURL(`file://${__dirname}/src/index.html`);

    createTray();
})

function createTray() {
    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
    tray = new AppTray(iconPath, mainWindow);

}
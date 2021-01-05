const path = require('path');
const electron = require('electron');
const { BrowserWindow, app, Tray } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        show: false,
        width: 300,
        height: 500,
        frame: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    })
    mainWindow.loadFile('src/index.html');
    //mainWindow.loadURL(`file://${__dirname}/src/index.html`);

    createTray();
})

function createTray() {
    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
    tray = new Tray(iconPath);

    tray.on('click', (event, bound) => {
        const { x, y } = bound;
        const { width, height } = mainWindow.getBounds();

        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            mainWindow.setBounds({
                x: x - width / 2,
                y,
                width,
                height
            });
            mainWindow.show();
        }
    });
}
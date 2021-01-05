const { BrowserWindow } = require("electron");


class MainWindow extends BrowserWindow {
    constructor() {
        super({
            show: false,
            width: 300,
            height: 500,
            frame: false,
            resizable: false,
            webPreferences: {
                nodeIntegration: true
            }
        });

        this.on('blur', this.hide);

    }
}

module.exports = MainWindow;
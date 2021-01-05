const { Tray, app, Menu } = require('electron');


class AppTray extends Tray {

    constructor(iconPath, mainWindow) {
        super(iconPath);
        this.mainWindow = mainWindow;

        this.setToolTip('My App...');
        //this.onClick = this.onClick.bind(this);
        this.on('click', this.onClick);
        this.on('right-click', this.onRightClick);

    }

    onClick = (event, bound) => {
        const { x, y } = bound;
        const { width, height } = this.mainWindow.getBounds();

        if (this.mainWindow.isVisible()) {
            this.mainWindow.hide();
        } else {
            const yPos = process.platform === 'darwin' ? y : y - height;
            this.mainWindow.setBounds({
                x: x - width / 2,
                y: yPos,
                width,
                height
            });
            this.mainWindow.show();
        }
    }

    onRightClick = () => {
        const menuConfig = Menu.buildFromTemplate([
            {
                label: 'Quite',
                click: () => app.quit()
            }
        ]);

        this.popUpContextMenu(menuConfig);
    }


}

module.exports = AppTray;
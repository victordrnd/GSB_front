const { app, BrowserWindow, screen, nativeImage, Menu } = require('electron');
const url = require('url');
const path = require('path');
let win;

function createWindow() {
    // Create the browser window.
    const size = screen.getPrimaryDisplay().workAreaSize;

    const image = nativeImage.createFromPath(
        app.getAppPath() + "/icons/mac/icon.icns"
    );
    app.dock.setIcon(image);
    const iconUrl = url.format({
        pathname: path.join(__dirname, 'icons/mac/icon.icns'),
        protocol: 'file:',
        slashes: true
    });
    Menu.setApplicationMenu(null)
    win = new BrowserWindow({
        width: size.width - 100,
        height: size.height - 100,
        backgroundColor: '#ffffff',
        icon: iconUrl,
        webPreferences: {
            webSecurity: false
        },
        //titleBarStyle : "hidden",
        frame: false,
        transparent: true,
        resizable: true
    })
    //win.loadURL(`file://${__dirname}/dist/index.html`)
    win.loadURL("https://gsb.victordurand.fr");
    //// uncomment below to open the DevTools.
    // win.webContents.openDevTools()

    // Event when the window is closed.
    win.on('closed', function () {
        win = null
    })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

    // On macOS specific close process
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // macOS specific close process
    if (win === null) {
        createWindow()
    }
})
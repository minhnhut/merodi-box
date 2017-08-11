// TODO is there any where to get rid of "default"
const Constant = require("./js/core/Constant");

// Electron
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var mainWindow = null;
const dialog = electron.dialog;
const fs = require('fs');

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        width: 1300,
        height: 600,
        resizable: true,
        frame: false,
        titleBarStyle: 'customButtonsOnHover'
    });
    var template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Sound control',
                    accelerator: 'CommandOrControl+O',
                    click: function() {
                        openFolderDialog();
                    }
                }
            ]
        }
    ];
    var Menu = electron.Menu;
    var menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});

function openFolderDialog() {
    dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory']
    }, function(filePath) {
        fs.readdir(filePath[0], function(err, files) {
            var arr = [];
            
            for (var i = 0; i < files.length; i++) {
                if (files[i].substr(-4) == '.mp3') {
                    arr.push(files[i]);
                }
            }
            mainWindow.webContents.send('modal-file-content', {
                basePath: filePath[0],
                songs: arr
            });
        });
    });
}

const ipc = electron.ipcMain;
ipc.on(Constant.INVOKE_MAIN_PROCESS_FILE_DIALOG, function(event, arg) {
    openFolderDialog();
});
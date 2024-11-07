import { app, BrowserWindow, shell, ipcMain, Menu, screen } from 'electron';
import { exec } from 'child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import os from 'node:os';


const isDev = !app.isPackaged;

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs   > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.APP_ROOT = path.join(__dirname, '../..');

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
    ? path.join(process.env.APP_ROOT, 'public')
    : RENDERER_DIST;

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
}

let mainWindow: BrowserWindow | null = null;
const preload = path.join(__dirname, '../preload/index.mjs');
const indexHtml = path.join(RENDERER_DIST, 'index.html');

const WINDOWS_WIDTH = 500;
const createMainWindow = async () => {
    mainWindow = new BrowserWindow({
        title: 'Main window',
        icon: path.join(process.env.VITE_PUBLIC, '/my-dock.png'),
        width: WINDOWS_WIDTH,
        useContentSize: true,
        height: 50,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        resizable: false,
        skipTaskbar: true,
        // type: 'dock',    // Cambia el tipo de ventana (prueba también con 'dock')
        webPreferences: {
            preload,
            // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
            // nodeIntegration: true,

            // Consider using contextBridge.exposeInMainWorld
            // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
            // contextIsolation: false,
        },
    });

    // Posicionar el overlay en la esquina inferior derecha de la pantalla
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    mainWindow.setPosition(width * 0.5 - WINDOWS_WIDTH * 0.5, 0);

    if (VITE_DEV_SERVER_URL) { // #298
        mainWindow.loadURL(VITE_DEV_SERVER_URL);
        // Open devTool if the app is not packaged
        // mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(indexHtml);
    }

    // Make all links open with the browser, not with the application
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('https:')) shell.openExternal(url);
        return { action: 'deny' };
    });


    mainWindow.on('closed', () => app.quit());
    mainWindow.on('close', () => mainWindow.destroy()); // Force destruction

    if (!isDev) Menu.setApplicationMenu(null);
};

app.whenReady().then(() => {
    createMainWindow();
    console.log(process.platform, 'is ready!');
});

app.on('window-all-closed', () => {
    mainWindow = null;
    if (process.platform !== 'darwin') app.quit();
});

app.on('second-instance', () => {
    if (mainWindow) {
        // Focus on the main window if the user tried to open another
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
    }
});

app.on('activate', () => {
    const allWindows = BrowserWindow.getAllWindows();
    if (allWindows.length) {
        allWindows[0].focus();
    } else {
        createMainWindow();
    }
});

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
    const childWindow = new BrowserWindow({
        webPreferences: {
            preload,
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    if (VITE_DEV_SERVER_URL) {
        childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`);
    } else {
        childWindow.loadFile(indexHtml, { hash: arg });
    }
});

ipcMain.on('open-folder', (event, folderPath: string) => {
    const command = `code ${folderPath}`; // Comando para abrir en VS Code
    exec(command, (error) => {
        if (error) {
            console.error('Error al abrir la carpeta:', error);
        }
    });
});
ipcMain.on("close-button", (event) => {
    mainWindow?.close();
});

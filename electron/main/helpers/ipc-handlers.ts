// ipcHandlers.ts
import { ipcMain, BrowserWindow, shell } from 'electron';
import { spawn } from 'child_process';
import { MAIN_WINDOW, ResizeWindow } from './main-window';
import { VITE_DEV_SERVER_URL } from './paths';

export const SetupIpcHandlers = (preload: string, indexHtml: string) => {
    ipcMain.handle('open-win', (_, arg) => {
        const childWindow = new BrowserWindow({
            webPreferences: {
                preload,
                nodeIntegration: true,
                contextIsolation: false,
            },
        });

        if (VITE_DEV_SERVER_URL) childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`);
        if (!VITE_DEV_SERVER_URL) childWindow.loadFile(indexHtml, { hash: arg });
    });

    ipcMain.on('open-folder-in-vscode', (_event, folderPath: string) => {
        // Execute the AppImage in detached mode
        const proceso = spawn('code', [folderPath], { detached: true, stdio: 'ignore' });

        // Disasociate the process so it doesn't depend on Electron
        proceso.unref();
    });

    ipcMain.on("close-button", () => {
        MAIN_WINDOW?.close();
    });

    ipcMain.on('resize-window', (_event) => {
        ResizeWindow();
    });

    ipcMain.on('open-app-image', (_event, filePath: string) => {
        // Execute the AppImage in detached mode
        const proceso = spawn(filePath, { detached: true, stdio: 'ignore' });

        // Disasociate the process so it doesn't depend on Electron
        proceso.unref();
    });

    // New handler to open a directory using the default file manager
    ipcMain.on('open-directory', (_event, directoryPath: string) => {
        shell.openPath(directoryPath).then((result) => {
            if (result) {
                console.error('Error opening directory:', result);
            }
        });
    });
};

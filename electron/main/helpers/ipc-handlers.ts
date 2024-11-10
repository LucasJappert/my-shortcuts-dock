// ipcHandlers.ts
import { ipcMain, BrowserWindow } from 'electron';
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

    ipcMain.on('open-folder-in-vscode', (event, folderPath: string) => {
        // Execute the AppImage in detached mode
        const proceso = spawn('code', [folderPath], { detached: true, stdio: 'ignore' });

        // Disasociate the process so it doesn't depend on Electron
        proceso.unref();
    });

    ipcMain.on("close-button", () => {
        MAIN_WINDOW?.close();
    });

    ipcMain.on('resize-window', (event) => {
        ResizeWindow();
    });

    ipcMain.on('open-app-image', (event, filePath: string) => {
        // Execute the AppImage in detached mode
        const proceso = spawn(filePath, { detached: true, stdio: 'ignore' });

        // Disasociate the process so it doesn't depend on Electron
        proceso.unref();
    });
};

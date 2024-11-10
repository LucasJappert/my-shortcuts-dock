// ipcHandlers.ts
import { ipcMain, BrowserWindow } from 'electron';
import { exec } from 'child_process';
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
        // openFolderInVSCode
        const command = `code ${folderPath}`;
        exec(command, (error) => {
            if (error) {
                console.error('Error al abrir la carpeta:', error);
            }
        });
    });

    ipcMain.on("close-button", () => {
        MAIN_WINDOW?.close();
    });

    ipcMain.on('resize-window', (event) => {
        ResizeWindow();
    });
};

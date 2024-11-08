import { app, BrowserWindow } from 'electron';
import { CreateMainWindow } from './main-window';

export const SetupAppEvents = (isDev: boolean, preload: string, indexHtml: string) => {
    app.whenReady().then(() => {
        CreateMainWindow(isDev, preload, indexHtml);
        console.log(process.platform, 'is ready!');
    });

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit();
    });

    app.on('second-instance', () => {
        const mainWindow = BrowserWindow.getAllWindows()[0];
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            CreateMainWindow(isDev, preload, indexHtml);
        }
    });
};

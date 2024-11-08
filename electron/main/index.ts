import { app } from 'electron';
import os from 'node:os';
import { SetupAppEvents } from './helpers/app-events';
import { SetupIpcHandlers } from './helpers/ipc-handlers';
import { MAIN_DIST, RENDERER_DIST, } from './helpers/paths';
import path from 'node:path';


const isDev = !app.isPackaged;
const preload = path.join(MAIN_DIST, 'preload/index.mjs');
const indexHtml = path.join(RENDERER_DIST, 'index.html');

// Desactivar aceleración de hardware en Windows 7
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration();

// Establecer el nombre de la app en Windows 10+
if (process.platform === 'win32') app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
}

// Configurar eventos de la app
SetupAppEvents(isDev, preload, indexHtml);

// Configurar eventos de ipcMain
SetupIpcHandlers(preload, indexHtml);

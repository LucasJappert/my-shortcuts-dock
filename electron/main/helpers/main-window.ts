import { BrowserWindow, shell, screen, Menu } from 'electron';
import path from 'node:path';
import { VITE_DEV_SERVER_URL } from './paths';


const WINDOW_WIDTH = 400;
const WINDOW_WIDTH_FULL = 800;
const WINDOW_HEIGHT = 40;
const OVERLAY_WIDTH = 2560;

export let MAIN_WINDOW: BrowserWindow | null = null;

export const CreateMainWindow = async (isDev: boolean, preload: string, indexHtml: string) => {
    MAIN_WINDOW = new BrowserWindow({
        title: 'Main window',
        icon: path.join(process.env.VITE_PUBLIC, '/shortcuts.png'),
        width: WINDOW_WIDTH_FULL,
        useContentSize: true,
        height: WINDOW_HEIGHT,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        resizable: true,
        skipTaskbar: true,
        webPreferences: { preload },
    });

    _ReLocateWindow();

    if (VITE_DEV_SERVER_URL) {
        MAIN_WINDOW.loadURL(VITE_DEV_SERVER_URL);
        // if (isDev) MAIN_WINDOW.webContents.openDevTools();
    } else {
        MAIN_WINDOW.loadFile(indexHtml);
    }

    MAIN_WINDOW.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('https:')) shell.openExternal(url);
        return { action: 'deny' };
    });

    MAIN_WINDOW.on('closed', () => MAIN_WINDOW = null);

    if (!isDev) Menu.setApplicationMenu(null);
};

export const ResizeWindow = () => {
    const currentWidth = MAIN_WINDOW?.getSize()[0] || WINDOW_WIDTH_FULL;
    const newWidth = currentWidth >= WINDOW_WIDTH_FULL ? WINDOW_WIDTH : WINDOW_WIDTH_FULL;
    MAIN_WINDOW?.setSize(newWidth, WINDOW_HEIGHT, true);
    _ReLocateWindow();
};

const _ReLocateWindow = () => {
    const currentWidth = MAIN_WINDOW?.getSize()[0] || WINDOW_WIDTH_FULL;
    const { width: monitorWidth, height: monitorHeight } = screen.getPrimaryDisplay().workAreaSize;
    MAIN_WINDOW?.setPosition(monitorWidth * 0.5 - currentWidth * 0.5, monitorHeight - WINDOW_HEIGHT - 30, true);
};

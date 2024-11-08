import { BrowserWindow, shell, screen, Menu } from 'electron';
import path from 'node:path';
import { VITE_DEV_SERVER_URL } from './paths';


const WINDOWS_WIDTH = 600;
const WINDOWS_HEIGHT = 60;
const OVERLAY_WIDTH = 2560;

export let MAIN_WINDOW: BrowserWindow | null = null;

export const CreateMainWindow = async (isDev: boolean, preload: string, indexHtml: string) => {
    MAIN_WINDOW = new BrowserWindow({
        title: 'Main window',
        icon: path.join(process.env.VITE_PUBLIC, '/shortcuts.png'),
        width: WINDOWS_WIDTH,
        useContentSize: true,
        height: WINDOWS_HEIGHT,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        resizable: false,
        skipTaskbar: true,
        webPreferences: { preload },
    });

    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    MAIN_WINDOW.setPosition(OVERLAY_WIDTH * 0.5 - WINDOWS_WIDTH - 300, height - WINDOWS_HEIGHT - 30);

    if (VITE_DEV_SERVER_URL) {
        MAIN_WINDOW.loadURL(VITE_DEV_SERVER_URL);
        if (isDev) MAIN_WINDOW.webContents.openDevTools();
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

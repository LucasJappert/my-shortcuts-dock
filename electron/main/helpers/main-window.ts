import { BrowserWindow, shell, screen, Menu } from 'electron';
import path from 'node:path';
import { VITE_DEV_SERVER_URL } from './paths';
import { MOUSE } from './mouse';


export const _DockHeight = 70;
const ALWAYS_VISIBLE = false;

export let MAIN_WINDOW: BrowserWindow | null = null;

export const CreateMainWindow = async (isDev: boolean, preload: string, indexHtml: string) => {
    MAIN_WINDOW = new BrowserWindow({
        title: 'Main window',
        height: _DockHeight,
        width: GetDockWidth(),
        icon: path.join(process.env.VITE_PUBLIC, '/shortcuts.png'),
        useContentSize: true,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        resizable: true,
        skipTaskbar: true,
        webPreferences: { preload },
        type: 'utility', // Prueba con 'toolbar', 'utility' o 'splash'
    });

    RelocateWindow(false);

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

    MAIN_WINDOW.hide();

    setInterval(() => CheckMousePosition(), 200);
};

let WindowVisible = false;
const showThreshold: number = 5; // Margen en píxeles desde arriba

const CheckMousePosition = () => {
    const { width: monitorWidth } = screen.getPrimaryDisplay().workAreaSize;
    const xThresholdRange: Array<number> = [monitorWidth * 0.4, monitorWidth * 0.6];

    const { x, y } = GetMousePosition();

    const barBounds = GetWindowBounds();
    if (!barBounds) {
        console.warn('Bar bounds are invalid. Skipping CheckMousePosition.');
        return; // Evita errores si los bounds no están disponibles
    }

    const barTop = barBounds.y;
    const barBottom = barBounds.y + barBounds.height;

    const xThresholdValid = x >= xThresholdRange[0] && x <= xThresholdRange[1];
    if ((y <= showThreshold && xThresholdValid) && !WindowVisible) return ShowWindow();

    if (WindowVisible && (y > barBottom || y < barTop)) return HideWindow();
};

const GetMousePosition = () => {
    if (!MOUSE.position) return { x: 0, y: 0 };
    const scaleFactor = screen.getPrimaryDisplay().scaleFactor;
    return {
        x: MOUSE.position.x / scaleFactor,
        y: MOUSE.position.y / scaleFactor
    };
};

const GetDockWidth = () => {
    const { width: monitorWidth } = screen.getPrimaryDisplay().workAreaSize;
    return parseInt((monitorWidth * 0.5).toString());
};

export const GetXPosition = () => {
    const { width: monitorWidth } = screen.getPrimaryDisplay().workAreaSize;
    const xPosition = monitorWidth * 0.5 - GetDockWidth() * 0.5;

    return parseInt(xPosition.toString());
};

export const RelocateWindow = (visible: boolean) => {
    const yPosition = (visible || ALWAYS_VISIBLE) ? 0 : -_DockHeight;
    const xPosition = GetXPosition();
    const newBounds = {
        x: xPosition,
        y: yPosition,
        width: GetDockWidth(),
        height: _DockHeight
    };

    MAIN_WINDOW.setBounds(newBounds);
};

export const HideWindow = () => {
    if (ALWAYS_VISIBLE || !WindowVisible) return;

    RelocateWindow(false);
    WindowVisible = false;

    MAIN_WINDOW.hide();
};
export const ShowWindow = () => {
    if (WindowVisible) return;

    RelocateWindow(true);
    WindowVisible = true;

    MAIN_WINDOW.show();
};
export const GetWindowBounds = () => {
    if (!MAIN_WINDOW) return null;
    const bounds = MAIN_WINDOW.getBounds();
    if (bounds.width <= 0 || bounds.height <= 0) {
        console.error('Invalid bounds in GetWindowBounds:', bounds);
        return null;
    }
    return bounds;
};

export const ResizeWindow = () => {
    if (!MAIN_WINDOW) return;
    MAIN_WINDOW.setSize(GetDockWidth(), _DockHeight, true);
    RelocateWindow(true);
};


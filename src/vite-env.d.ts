/// <reference types="vite/client" />


interface Window {
    // expose in the `electron/preload/index.ts`
    ipcRenderer: import('electron').IpcRenderer;
}

export interface ElectronAPI {
    openFolderInVSCode: (folderPath: string) => void;
    closeButton: () => void;
    resizeWindow: (width: number, height: number) => void;
}

declare global {
    interface Window {
        electronAPI: ElectronAPI;
    }
}

/// <reference types="vite/client" />


interface Window {
    // expose in the `electron/preload/index.ts`
    ipcRenderer: import('electron').IpcRenderer;
}

export interface ElectronAPI {
    openFolder: (folderPath: string) => void;
    closeButton: () => void;
}

declare global {
    interface Window {
        electronAPI: ElectronAPI;
    }
}

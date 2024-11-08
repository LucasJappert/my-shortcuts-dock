export interface IShortCut {
    folderPath?: string;
    classes: string[];
    title?: string;
    linkWeb?: string;
    iconPath?: string;
    action?: () => void;
}

export class ShortCut implements IShortCut {
    folderPath?: string;
    classes: string[] = [];
    title?: string = '';
    linkWeb?: string;
    iconPath?: string;
    action?: () => void;
}

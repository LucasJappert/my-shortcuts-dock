type ActionType = "openDirectory" | "openInVSCode" | "openWebLink" | "openApp" | "";

export const ActionTypes = {
    openDirectory: "openDirectory",
    openInVSCode: "openInVSCode",
    openWebLink: "openWebLink",
    openApp: "openApp",
};

export interface IShortCut {
    classes: string[];
    iconPath?: string;
    actionType: ActionType;
    actionUrl: string;
    action?: () => void;
}

export class ShortCut implements IShortCut {
    classes: string[] = [];
    iconPath?: string;
    actionType: ActionType = "";
    actionUrl: string = "";
    action?: () => void;
}

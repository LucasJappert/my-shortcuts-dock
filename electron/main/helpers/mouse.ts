
import { uIOhook } from "uiohook-napi";

interface MousePosition {
    x: number;
    y: number;
}

export class MOUSE {
    public static position: MousePosition | null = null;
}

uIOhook.on('mousemove', (event) => {
    if (MOUSE.position == null) MOUSE.position = { x: 0, y: 0 };

    MOUSE.position.x = event.x;
    MOUSE.position.y = event.y;
});

uIOhook.start();


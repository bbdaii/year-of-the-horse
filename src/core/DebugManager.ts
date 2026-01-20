export class DebugManager {
    private debugMode: boolean;
    private debugContainer: HTMLElement;

    constructor(debugMode: boolean) {
        this.debugMode = debugMode;
        this.debugContainer = document.createElement('div');
        if (this.debugMode) {
            this.initDebug();
        }
    }

    private initDebug() {
        console.log('DebugManager init');
        this.debugContainer.classList.add('debug-container');

        this.debugContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.7);
            color: #0f0;
            padding: 10px;
            font-size: 12px;
            z-index: 9999;
            pointer-events: none;
            max-height: 200px;
            overflow: hidden;
        `;
        document.body.appendChild(this.debugContainer);
    }

    public log(message: string) {
        const log = document.createElement('div');
        log.textContent = message;
        this.debugContainer.appendChild(log);
        if (this.debugContainer.children.length > 10) {
            this.debugContainer.removeChild(this.debugContainer.children[0]);
        }
    }
}

export const debugManager = new DebugManager(true);
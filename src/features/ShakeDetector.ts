import { debugManager } from "../core/DebugManager";

export class ShakeDetector {
    private threshold: number;
    private motionHandler: ((e: DeviceMotionEvent) => void) | null = null;

    constructor() {
        this.threshold = 15;
    }

    public async start(onShake: () => void): Promise<void> {

        this.motionHandler = (e: DeviceMotionEvent) => {
            this.updateMotion(e, onShake)
        }

        // for ios 13+
        if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
            try {
                const permission = await (DeviceMotionEvent as any).requestPermission();
                if (permission === 'granted') {
                    debugManager.log('使用者已授權動作偵測');
                    console.log('使用者已授權動作偵測');
                    window.addEventListener('devicemotion', this.motionHandler);
                } else {
                    debugManager.log('使用者未授權動作偵測');
                    alert('需要動作偵測權限才能遊玩喔！');
                }
            } catch (error) {
                debugManager.log('請求權限失敗');
                console.error('請求權限失敗:', error);
            }
        }
        // for android and desktop
        else {
            debugManager.log('非 iOS 裝置，直接啟用偵測');
            console.log('非 iOS 裝置，直接啟用偵測');
            window.addEventListener('devicemotion', this.motionHandler);
        }
    }

    public stop() {
        if (this.motionHandler) {
            window.removeEventListener('devicemotion', this.motionHandler);
            this.motionHandler = null;
        }
    }


    private updateMotion(e: DeviceMotionEvent, onShake: () => void): void {
        const x = e.acceleration?.x ?? 0;
        const y = e.acceleration?.y ?? 0;
        const z = e.acceleration?.z ?? 0;
        const acceleration = Math.sqrt(x * x + y * y + z * z);
        if (acceleration > this.threshold) {

            debugManager.log(`acceleration: ${acceleration}`);
            onShake();
        }
    }
}

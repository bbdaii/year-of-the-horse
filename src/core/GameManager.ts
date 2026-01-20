
import { PageManager } from "./PageManager";
import { ShakeDetector } from "../features/ShakeDetector";
import { ResultGenerator } from "../features/ResultGenerator";
import { copywritings } from "../data/copywritings";
import { debugManager } from "../core/DebugManager";
import { soundManager } from "./SoundManager";

export class GameManager {
    private enterBtn: HTMLButtonElement;
    private resultBtn: HTMLButtonElement;
    private replayBtn: HTMLButtonElement;
    private shareBtn: HTMLButtonElement;
    private horseTitle: HTMLHeadingElement;
    private resultHorseTitle: HTMLHeadingElement;
    private pageManager: PageManager;
    private shakeDetector: ShakeDetector;
    private resultGenerator: ResultGenerator;

    private resultFile: File | null = null;

    constructor(pageManager: PageManager) {
        this.pageManager = pageManager;
        this.shakeDetector = new ShakeDetector();
        this.resultGenerator = new ResultGenerator();

        this.enterBtn = document.getElementById('btn-start') as HTMLButtonElement;
        this.resultBtn = document.getElementById('btn-result') as HTMLButtonElement;
        this.replayBtn = document.getElementById('btn-replay') as HTMLButtonElement;
        this.shareBtn = document.getElementById('btn-share') as HTMLButtonElement;
        this.horseTitle = document.getElementById('horse-title') as HTMLHeadingElement;
        this.resultHorseTitle = document.getElementById('result-horse-title') as HTMLHeadingElement;

        this.bindEvents();
    }

    public initGame() {
        this.pageManager.showPage('enter');
    }

    public destroyGame() {
        this.pageManager.showPage('enter');
        this.shakeDetector.stop();
    }

    private startGame() {
        this.pageManager.showPage('game');
        this.shakeDetector.stop()
        this.shakeDetector.start(() => this.onShake());
    }

    private async shareResult(): Promise<void> {


        if (!navigator.canShare) {
            debugManager.log(`Your browser doesn't support the Web Share API.`);
            return;
        }

        if (this.resultFile && navigator.canShare({ files: [this.resultFile] })) {
            try {

                await navigator.share({
                    files: [this.resultFile],
                    title: "馬屁",
                    text: "Beautiful images",
                });
                debugManager.log("Shared!");
            } catch (error: any) {
                debugManager.log(`Error: ${error.message}`);
                console.log(`Error: ${error.message}`);
            }
        } else {
            debugManager.log(`Your system doesn't support sharing these files.`);
        }
    }

    private async generateResult() {
        console.log("偷跑生成圖片")
        const blob = await this.resultGenerator.generateImageBlob();
        if (!blob) {
            debugManager.log('生成圖片失敗');
            return;
        }

        const file = new File([blob], 'result.png', { type: 'image/png' });
        this.resultFile = file;
    }

    private bindEvents(): void {
        this.enterBtn.addEventListener('click', () => {
            soundManager.playSFX('clickSound');
            soundManager.playBGM();
            this.startGame();
        });
        this.resultBtn.addEventListener('click', () => {
            soundManager.playSFX('clickSound');
            this.pageManager.showPage('result');
            this.generateResult();
        });
        this.replayBtn.addEventListener('click', () => {
            soundManager.playSFX('clickSound');
            this.startGame();
        });
        this.shareBtn.addEventListener('click', () => {
            soundManager.playSFX('clickSound');
            this.pageManager.showPage('result');
            this.shareResult();
        });
    }

    private onShake(): void {
        debugManager.log('偵測到搖晃手機');
        console.log('搖晃手機');

        soundManager.playSFX('whipSound');
        this.horseTitle.classList.remove('pop-animate');
        void this.horseTitle.offsetWidth; // Force reflow

        const newCopywriting = this.getRandomCopywriting();
        this.horseTitle.textContent = newCopywriting;
        this.resultHorseTitle.textContent = newCopywriting;
        this.horseTitle.classList.add('pop-animate');
    }

    private getRandomCopywriting(): string {
        const randomIndex = Math.floor(Math.random() * copywritings.length);
        return copywritings[randomIndex];
    }
}

export class SoundManager {
    private sounds: Record<string, HTMLAudioElement> = {};

    constructor() {
        this.loadSound('bgmSound', 'audio/bgm.mp3');
        this.loadSound('clickSound', 'audio/button.mp3');
        this.loadSound('whipSound', 'audio/whip.mp3');
    }

    private loadSound(key: string, path: string) {
        const audio = new Audio(path);
        this.sounds[key] = audio;
    }

    public playSFX(key: string) {
        this.sounds[key].currentTime = 0;
        this.sounds[key].play();
    }

    public playBGM() {
        this.sounds['bgmSound'].play();
        this.sounds['bgmSound'].loop = true;
    }
}

export const soundManager = new SoundManager();

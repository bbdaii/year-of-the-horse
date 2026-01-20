
import html2canvas from 'html2canvas';

export class ResultGenerator {
    private sourceElement: HTMLElement;


    constructor() {
        this.sourceElement = document.getElementById('result-image')!;
    }

    public async generateImageBlob(): Promise<Blob | null> {
        const canvas = await html2canvas(this.sourceElement);
        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/png');
        });
    }
}

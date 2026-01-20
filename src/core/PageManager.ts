type PageId = 'enter' | 'game' | 'result';

export class PageManager {
    private pageId: PageId;
    private enterPage: HTMLElement;
    private gamePage: HTMLElement;
    private resultPage: HTMLElement;

    constructor() {
        this.pageId = 'enter';
        this.enterPage = document.getElementById('page-enter')!;
        this.gamePage = document.getElementById('page-game')!;
        this.resultPage = document.getElementById('page-result')!;
    }

    public showPage(pageId: PageId) {
        this.pageId = pageId;
        this.enterPage.classList.add('hidden');
        this.gamePage.classList.add('hidden');
        this.resultPage.classList.add('hidden');

        switch (pageId) {
            case 'enter':
                this.enterPage.classList.remove('hidden');
                break;
            case 'game':
                this.gamePage.classList.remove('hidden');
                break;
            case 'result':
                this.resultPage.classList.remove('hidden');
                break;
            default:
                break;
        }
    }
}


import { GameManager } from "./core/GameManager";
import { PageManager } from "./core/PageManager";

const pageManager = new PageManager();
new GameManager(pageManager);

window.addEventListener("DOMContentLoaded", () => {
  pageManager.showPage('enter');
});

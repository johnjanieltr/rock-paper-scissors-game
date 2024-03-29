import setGameScore from "./funcionalities/gameScore.js";
import game from "./game.js";
import searchDataset from "./helpers/searchDataset.js";
import toggleModalRules from "./helpers/toggleModalRules.js";

const $secsWrapper = document.getElementById("secs-wrapper");
let chooseOptionsIsActive;

document.addEventListener("DOMContentLoaded", () => {
  setGameScore();
  setTimeout(() => {
    document.getElementById("s-loader").classList.add("d-none");
    chooseOptionsIsActive = true;
  }, 2000);
});

window.addEventListener("load", () => {
  $secsWrapper.style.height = window.innerHeight + "px";
});

document.addEventListener("click", (e) => {
  const etm = (selector) => e.target.matches(selector);

  if (etm("#rules-btn")) toggleModalRules();
  if (etm("#close-btn") || etm("#close-btn *")) toggleModalRules();
  if (etm(".opt-base") || etm(".opt-base *")) {
    if (chooseOptionsIsActive) {
      game.runGame(searchDataset(e.target).select);
      chooseOptionsIsActive = false;
    }
  }
  if (etm("#play-again-btn")) {
    game.returnToGame();
    chooseOptionsIsActive = true;
  }
});

import randomHouseSelect from "./randomHouseSelect.js";
import setTheWinner from "./setTheWinner.js";
import setGameScore from "./gameScore.js";
import { rockSvg, paperSvg, scissorsSvg } from "./svgRenders.js";

const $board = document.getElementById("board"),
  $bgTriangle = document.getElementById("bg-triangle"),
  $select1 = document.getElementById("select-1"),
  $select2 = document.getElementById("select-2"),
  $select3 = document.getElementById("select-3"),
  $select1Base = document.getElementById("select-1-base"),
  $select2Base = document.getElementById("select-2-base"),
  $select3Base = document.getElementById("select-3-base"),
  $rsActions = document.getElementById("rs-actions"),
  $resultMsg = document.getElementById("result-msg"),
  $optBaseMsgs = document.querySelectorAll(".opt-base__label");

export const runGame = (playerSelect) => {
  let houseSelect = randomHouseSelect(),
    winner = setTheWinner(playerSelect, houseSelect);

  if (winner === "player") setGameScore(1);
  if (winner === "house") setGameScore(-1);
  showResultsScreen(playerSelect, houseSelect, winner);
};

export const showResultsScreen = (playerSelect, houseSelect, winner) => {
  // change the view from game board mode to results board mode
  $board.classList.remove("game-board");
  $board.classList.add("results-board");
  // opt labels are visible
  $optBaseMsgs[0].classList.remove("d-none");
  $optBaseMsgs[1].classList.remove("d-none");
  // hide all visible board elements
  $bgTriangle.classList.add("d-none");
  $select3Base.classList.add("d-none");
  $select1.classList.add("d-none");
  $select2.classList.add("d-none");
  $select3.classList.add("d-none");
  $select1.classList.add("cursor-default");
  $select2.classList.add("cursor-default");
  // disable animations when hovering in the opts
  $select1Base.classList.remove("opt-base--scale-hover");
  $select2Base.classList.remove("opt-base--scale-hover");

  $rsActions.classList.add("v-hidden");
  $rsActions.classList.remove("d-none");

  // render an svg in select 1 depending of the player selection
  if (playerSelect === "rock") {
    $select1.classList.remove("paper-color");
    $select1.classList.add("rock-color");
    $select1.innerHTML = rockSvg;
  } else if (playerSelect === "paper") {
  } else if (playerSelect === "scissors") {
    $select1.classList.remove("paper-color");
    $select1.classList.add("scissors-color");
    $select1.innerHTML = scissorsSvg;
  } else {
    return console.error("error");
  }

  // render an svg in select 2 depending of the house selection
  if (houseSelect === "rock") {
    $select2.classList.remove("scissors-color");
    $select2.classList.add("rock-color");
    $select2.innerHTML = rockSvg;
  } else if (houseSelect === "paper") {
    $select2.classList.remove("scissors-color");
    $select2.classList.add("paper-color");
    $select2.innerHTML = paperSvg;
  } else if (houseSelect === "scissors") {
  } else {
    return console.error("error");
  }

  if (winner === "player") {
    $resultMsg.textContent = "you win";
  } else if (winner === "house") {
    $resultMsg.textContent = "you lose";
  } else if (winner === "none") {
    $resultMsg.textContent = "tie";
  } else {
    return console.error("error");
  }

  // animations
  setTimeout(() => {
    $select1.classList.remove("d-none");
  }, 700);

  setTimeout(() => {
    $select2.classList.remove("d-none");
  }, 1600);

  setTimeout(() => {
    $rsActions.classList.remove("v-hidden");
    document.getElementById("score-number").textContent =
      localStorage.getItem("game-score");
  }, 2200);
};

export const returnToGame = () => {
  // change the view from game board mode to results board mode
  $board.classList.remove("results-board");
  $board.classList.add("game-board");
  // opt labels are hidden
  $optBaseMsgs[0].classList.add("d-none");
  $optBaseMsgs[1].classList.add("d-none");
  // clean the result message and hide the action buttons
  $resultMsg.textContent = "";
  $rsActions.classList.add("d-none");
  // assigning each opt its default svg
  $select1.innerHTML = paperSvg;
  $select2.innerHTML = scissorsSvg;
  $select3.innerHTML = rockSvg;
  // enable animations when hovering in the opts
  $select1.classList.remove("cursor-default");
  $select2.classList.remove("cursor-default");
  $select1Base.classList.add("opt-base--scale-hover");
  $select2Base.classList.add("opt-base--scale-hover");
  // remove non-default colors
  $select1.classList.remove("rock-color");
  $select1.classList.remove("scissors-color");
  $select2.classList.remove("paper-color");
  $select2.classList.remove("rock-color");
  $select3.classList.remove("paper-color");
  $select3.classList.remove("scissors-color");
  // make elements visible
  $select3.classList.remove("d-none");
  $select3Base.classList.remove("d-none");
  $bgTriangle.classList.remove("d-none");
  // set the default colors for each opt
  $select1.classList.add("paper-color");
  $select2.classList.add("scissors-color");
  $select3.classList.add("rock-color");
};

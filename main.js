"use strict";

const playWithCpu = document.getElementById("cpu-mode");
const playWithFriend = document.getElementById("friend-mode");
const checkX = document.getElementById("Xplayer");
const checkO = document.getElementById("Oplayer");
const iconO = document.querySelector(".O-select");
const iconX = document.querySelector(".X-select");
const boxSpan = document.querySelectorAll(".box");
let goToGame = document.getElementById("continue-game");
const resultDisplay = document.querySelector(".result-box");
const restartGame = document.getElementById("Restart");
const message = document.querySelector(".msg");

let go = "cross"; //player playing first

goToGame.style.opacity = "0";

//remove result box
resultDisplay.addEventListener("click", function () {
  resultDisplay.style.display = "none";
});

//function checking the score Box
function checkScore() {
  console.log(boxSpan);
  const winnningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  winnningCombo.forEach((array) => {
    const circleWins = array.every((cell) =>
      boxSpan[cell].firstChild?.classList.contains("circle")
    );
    if (circleWins) {
      document.querySelector(".result-box").style.display = "flex";
      message.textContent = "Player O wins";
      boxSpan.forEach((cell) => cell.replaceWith(cell.cloneNode(true)));
      return;
    }
  });

  winnningCombo.forEach((array) => {
    const crossWins = array.every((cell) =>
      boxSpan[cell].firstChild?.classList.contains("cross")
    );
    if (crossWins) {
      resultDisplay.style.display = "flex";
      message.textContent = "Player X wins";
      boxSpan.forEach((cell) => cell.replaceWith(cell.cloneNode(true)));

      return;
    }
  });
}

//function to add player to the box
function addingPlayer(e) {
  console.log(e.target);
  const goDisplay = document.createElement("span");
  goDisplay.classList.add(go);
  e.target.append(goDisplay);
  go = go === "circle" ? "cross" : "circle";
  e.target.removeEventListener("click", addingPlayer);
  checkScore();
}

boxSpan.forEach((elem) => {
  elem.addEventListener("click", addingPlayer);
});

// Selecting the Desired Play, either with CPU or Friend
function selectPlayer() {
  document.querySelector(".play-mode").style.display = "none";
  document.querySelector(".select-player").style.display = "flex";
}

playWithCpu.addEventListener("click", selectPlayer);
playWithFriend.addEventListener("click", selectPlayer);

checkX.addEventListener("click", function () {
  document.getElementById("Oplayer").disabled = true;
  iconO.style.opacity = "0.5";
  goToGame.style.opacity = "1";

  go = "cross";
});

checkO.addEventListener("click", function () {
  document.getElementById("Xplayer").disabled = true;
  iconX.style.opacity = "0.5";
  goToGame.style.opacity = "1";

  go = "circle";
});

goToGame.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".select-player").style.display = "none";
  document.querySelector(".game-room").style.display = "flex";
  document.querySelector(".result-box").style.display = "none";
});

restartGame.addEventListener("click", function () {
  // console.log("Restart Game");
  // setInterval("location.reload()", 100);
  setTimeout(function(){
   window.location.reload();
}, 1000);
});

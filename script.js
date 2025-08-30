const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X"; // Player is always X
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute("data-index");

  if (gameState[index] !== "" || !gameActive) return;

  makeMove(cell, index, currentPlayer);

  if (checkWinner()) return;
  
  // Computer turn
  setTimeout(computerMove, 500);
}

function makeMove(cell, index, player) {
  gameState[index] = player;
  cell.textContent = player;
  cell.style.color = (player === "X") ? "#ff77ff" : "#66fcf1";
}

function computerMove() {
  let available = gameState.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
  if (available.length === 0) return;
  
  let choice = available[Math.floor(Math.random() * available.length)];
  const cell = cells[choice];
  makeMove(cell, choice, "O");
  
  if (checkWinner()) return;
}

function checkWinner() {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `🎉 Player ${currentPlayer} wins! 🐱`;
    gameActive = false;
    return true;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "😺 It's a draw!";
    gameActive = false;
    return true;
  }

  currentPlayer = (currentPlayer === "X") ? "X" : "X"; // Player always X
  statusText.textContent = "Your turn: X";
  return false;
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = "Your turn: X";
  cells.forEach(cell => (cell.textContent = ""));
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);

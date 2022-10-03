const board = document.querySelector(".board");
const turn = document.querySelector(".turn");

let el;
let player = "X";

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [2, 4, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [0, 3, 6],
];

for (x = 0; x < 9; ++x) {
  el = document.createElement("div");
  el.className = "check";
  board.append(el);
}

const nodes = document.querySelectorAll(".check");

nodes.forEach((node, index) => {
  node.classList.add(index);

  node.addEventListener("click", () => {
    if (node.textContent.trim("") != "") return;
    node.textContent = player;
    node.style.color = node.textContent.trim() == "X" ? "red" : "blue";
    checkWin();
    player = player == "X" ? "O" : "X";
    turn.textContent = `Player: ${player}'s Turn!`;
  });
});

function checkWin() {
  winningConditions.forEach((condition) => {
    let draw = Array.from(nodes).every((node) => node.textContent.trim() != "");
    let check = condition.every(
      (index) => nodes[index].textContent.trim() == player
    );
    if (check) {
      alert(player + " WON");
      clearBoard();
      addScore()
    }
    if (draw) {
      alert("Draw");
      clearBoard();
    }
  });
}

function addScore() {
  let scoreEl = document.querySelector(`.${player.toLocaleLowerCase()}-score`);
  let playerScore = scoreEl.textContent;
  scoreEl.textContent = +playerScore + 1
}

function clearBoard() {
  nodes.forEach((node) => (node.textContent = ""));
}

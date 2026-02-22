// Show Selected Game
function showGame(gameId) {
    document.querySelectorAll('.game').forEach(game => {
        game.style.display = 'none';
    });
    document.getElementById(gameId).style.display = 'block';
}

// -------------------
// Tic Tac Toe
// -------------------

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const board = document.getElementById("board");

function createBoard() {
    board.innerHTML = "";
    boardState.forEach((cell, index) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.addEventListener("click", () => makeMove(index));
        cellDiv.textContent = cell;
        board.appendChild(cellDiv);
    });
}

function makeMove(index) {
    if (boardState[index] !== "" || !gameActive) return;

    boardState[index] = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    checkWinner();
    createBoard();
}

function checkWinner() {
    const winningCombos = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    for (let combo of winningCombos) {
        const [a,b,c] = combo;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            document.getElementById("ticStatus").textContent = boardState[a] + " Wins!";
            gameActive = false;
            return;
        }
    }

    if (!boardState.includes("")) {
        document.getElementById("ticStatus").textContent = "It's a Draw!";
        gameActive = false;
    }
}

function resetTic() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    document.getElementById("ticStatus").textContent = "";
    createBoard();
}

createBoard();

// -------------------
// Rock Paper Scissors
// -------------------

function playRPS(playerChoice) {
    const choices = ["Rock", "Paper", "Scissors"];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    let result = "";

    if (playerChoice === computerChoice) {
        result = "It's a Tie!";
    } else if (
        (playerChoice === "Rock" && computerChoice === "Scissors") ||
        (playerChoice === "Paper" && computerChoice === "Rock") ||
        (playerChoice === "Scissors" && computerChoice === "Paper")
    ) {
        result = "You Win!";
    } else {
        result = "Computer Wins!";
    }

    document.getElementById("rpsResult").textContent =
        `You chose ${playerChoice}, Computer chose ${computerChoice}. ${result}`;
}

// -------------------
// Number Guessing
// -------------------

let randomNumber = Math.floor(Math.random() * 100) + 1;

function checkGuess() {
    const guess = Number(document.getElementById("guessInput").value);
    const result = document.getElementById("guessResult");

    if (guess === randomNumber) {
        result.textContent = "Correct! Generating new number...";
        randomNumber = Math.floor(Math.random() * 100) + 1;
    } else if (guess < randomNumber) {
        result.textContent = "Too Low!";
    } else {
        result.textContent = "Too High!";
    }
}
// Smooth switching
function showGame(id) {
    document.querySelectorAll(".game").forEach(g => g.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

/* =========================
   TIC TAC TOE (2 PLAYERS)
========================= */

let boardState = ["","","","","","","","",""];
let currentPlayer = "X";
let scoreX = 0, scoreO = 0;
let gameActive = true;

const board = document.getElementById("board");

function createBoard() {
    board.innerHTML = "";
    boardState.forEach((cell, i) => {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.textContent = cell;
        div.onclick = () => makeMove(i);
        board.appendChild(div);
    });
}
createBoard();

function makeMove(i) {
    if(boardState[i] || !gameActive) return;

    boardState[i] = currentPlayer;
    createBoard();

    if(checkWinner()) return;

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("ticStatus").textContent =
        `Player ${currentPlayer === "X" ? "1 (X)" : "2 (O)"} Turn`;
}

function checkWinner() {
    const combos = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    for(let c of combos){
        const [a,b,d] = c;
        if(boardState[a] && boardState[a]===boardState[b] && boardState[a]===boardState[d]){
            document.getElementById("ticStatus").textContent =
                `Player ${boardState[a] === "X" ? "1" : "2"} Wins!`;

            if(boardState[a] === "X"){
                scoreX++;
                document.getElementById("scoreX").textContent = scoreX;
            } else {
                scoreO++;
                document.getElementById("scoreO").textContent = scoreO;
            }

            gameActive = false;
            return true;
        }
    }

    if(!boardState.includes("")){
        document.getElementById("ticStatus").textContent = "Draw!";
        gameActive = false;
        return true;
    }
    return false;
}

function resetTic(){
    boardState = ["","","","","","","","",""];
    currentPlayer = "X";
    gameActive = true;
    document.getElementById("ticStatus").textContent = "";
    createBoard();
}

/* =========================
   SNAKE GAME (FIXED)
========================= */

const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 350;
canvas.height = 350;

let snake, food, dx, dy, score, highScore = 0;
let gameInterval;

function startSnake(){
    snake = [{x: 160, y:160}];
    dx = 20;
    dy = 0;
    score = 0;
    document.getElementById("snakeScore").textContent = 0;

    food = randomFood();

    clearInterval(gameInterval);
    gameInterval = setInterval(drawSnake, 120);
}

function randomFood(){
    return {
        x: Math.floor(Math.random() * 17) * 20,
        y: Math.floor(Math.random() * 17) * 20
    };
}

function drawSnake(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "lime";
    snake.forEach(p => ctx.fillRect(p.x,p.y,18,18));

    ctx.fillStyle = "red";
    ctx.fillRect(food.x,food.y,18,18);

    const head = {x: snake[0].x + dx, y: snake[0].y + dy};

    if(head.x === food.x && head.y === food.y){
        score++;
        document.getElementById("snakeScore").textContent = score;
        if(score > highScore){
            highScore = score;
            document.getElementById("snakeHigh").textContent = highScore;
        }
        food = randomFood();
    } else {
        snake.pop();
    }

    snake.unshift(head);

    if(
        head.x < 0 || head.y < 0 ||
        head.x >= canvas.width || head.y >= canvas.height ||
        snake.slice(1).some(p => p.x === head.x && p.y === head.y)
    ){
        clearInterval(gameInterval);
        alert("Game Over!");
    }
}

// Keyboard controls
document.addEventListener("keydown", e => {
    if(e.key === "ArrowUp" && dy === 0){ dx = 0; dy = -20; }
    if(e.key === "ArrowDown" && dy === 0){ dx = 0; dy = 20; }
    if(e.key === "ArrowLeft" && dx === 0){ dx = -20; dy = 0; }
    if(e.key === "ArrowRight" && dx === 0){ dx = 20; dy = 0; }
});

// Mobile controls
function changeDirection(dir){
    if(dir === "up" && dy === 0){ dx = 0; dy = -20; }
    if(dir === "down" && dy === 0){ dx = 0; dy = 20; }
    if(dir === "left" && dx === 0){ dx = -20; dy = 0; }
    if(dir === "right" && dx === 0){ dx = 20; dy = 0; }
}

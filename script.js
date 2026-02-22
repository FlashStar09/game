// =========================
// Smooth Game Switching
// =========================
function showGame(id) {
    document.querySelectorAll(".game").forEach(g => {
        g.classList.remove("active");
        g.style.display = "none";
    });

    const selected = document.getElementById(id);
    selected.style.display = "block";

    setTimeout(() => {
        selected.classList.add("active");
    }, 50);
}

// =========================
// Scoreboard
// =========================
let scoreX = 0, scoreO = 0;
let scoreYou = 0, scoreComp = 0;
let snakeHighScore = 0;

// =========================
// Tic Tac Toe
// =========================
let currentPlayer = "X";
let boardState = ["","","","","","","","",""];
let gameActive = true;
const board = document.getElementById("board");

function createBoard() {
    board.innerHTML = "";
    boardState.forEach((cell, index) => {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.textContent = cell;
        div.onclick = () => makeMove(index);
        board.appendChild(div);
    });
}

function makeMove(i) {
    if(boardState[i] || !gameActive) return;
    boardState[i] = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    createBoard();
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
            document.getElementById("ticStatus").textContent = boardState[a] + " Wins!";
            if(boardState[a]==="X"){
                scoreX++;
                document.getElementById("scoreX").textContent=scoreX;
            } else {
                scoreO++;
                document.getElementById("scoreO").textContent=scoreO;
            }
            gameActive=false;
        }
    }

    if(!boardState.includes("") && gameActive){
        document.getElementById("ticStatus").textContent="Draw!";
        gameActive=false;
    }
}

function resetTic(){
    boardState=["","","","","","","","",""];
    gameActive=true;
    document.getElementById("ticStatus").textContent="";
    createBoard();
}
createBoard();

// =========================
// Rock Paper Scissors
// =========================
function playRPS(choice){
    const options=["Rock","Paper","Scissors"];
    const comp=options[Math.floor(Math.random()*3)];
    let result="";

    if(choice===comp) result="Tie!";
    else if(
        (choice==="Rock"&&comp==="Scissors")||
        (choice==="Paper"&&comp==="Rock")||
        (choice==="Scissors"&&comp==="Paper")
    ){
        result="You Win!";
        scoreYou++;
        document.getElementById("scoreYou").textContent=scoreYou;
    } else {
        result="Computer Wins!";
        scoreComp++;
        document.getElementById("scoreComp").textContent=scoreComp;
    }

    document.getElementById("rpsResult").textContent=
        `You: ${choice} | Computer: ${comp} → ${result}`;
}

// =========================
// Number Guessing
// =========================
let randomNumber=Math.floor(Math.random()*100)+1;

function checkGuess(){
    const guess=Number(document.getElementById("guessInput").value);
    const result=document.getElementById("guessResult");

    if(guess===randomNumber){
        result.textContent="Correct! New number generated.";
        randomNumber=Math.floor(Math.random()*100)+1;
    } else if(guess<randomNumber){
        result.textContent="Too Low!";
    } else {
        result.textContent="Too High!";
    }
}

// =========================
// Snake Game
// =========================
const canvas=document.getElementById("snakeCanvas");
const ctx=canvas.getContext("2d");

let snake, food, dx, dy, snakeScore, snakeGame;

function startSnake(){
    snake=[{x:200,y:200}];
    dx=20; dy=0;
    snakeScore=0;
    document.getElementById("snakeScore").textContent=0;

    food={
        x:Math.floor(Math.random()*20)*20,
        y:Math.floor(Math.random()*20)*20
    };

    clearInterval(snakeGame);
    snakeGame=setInterval(drawSnake,120);
}

function drawSnake(){
    ctx.fillStyle="#111";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="lime";
    snake.forEach(p=>ctx.fillRect(p.x,p.y,20,20));

    ctx.fillStyle="red";
    ctx.fillRect(food.x,food.y,20,20);

    const head={x:snake[0].x+dx,y:snake[0].y+dy};

    if(head.x===food.x && head.y===food.y){
        snakeScore++;
        document.getElementById("snakeScore").textContent=snakeScore;

        if(snakeScore>snakeHighScore){
            snakeHighScore=snakeScore;
            document.getElementById("snakeHigh").textContent=snakeHighScore;
        }

        food={
            x:Math.floor(Math.random()*20)*20,
            y:Math.floor(Math.random()*20)*20
        };
    } else {
        snake.pop();
    }

    snake.unshift(head);

    if(
        head.x<0 || head.x>=canvas.width ||
        head.y<0 || head.y>=canvas.height ||
        snake.slice(1).some(p=>p.x===head.x && p.y===head.y)
    ){
        clearInterval(snakeGame);
        alert("Game Over!");
    }
}

document.addEventListener("keydown",e=>{
    if(e.key==="ArrowUp"&&dy===0){dx=0;dy=-20;}
    if(e.key==="ArrowDown"&&dy===0){dx=0;dy=20;}
    if(e.key==="ArrowLeft"&&dx===0){dx=-20;dy=0;}
    if(e.key==="ArrowRight"&&dx===0){dx=20;dy=0;}
});

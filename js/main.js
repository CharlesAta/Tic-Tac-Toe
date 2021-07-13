// 1) Define required constants

const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");
const box4 = document.getElementById("box4");
const box5 = document.getElementById("box5");
const box6 = document.getElementById("box6");
const box7 = document.getElementById("box7");
const box8 = document.getElementById("box8");
const box9 = document.getElementById("box9");

const reset = document.getElementById("reset");

const winningCombos = [
	[box1, box2, box3],
	[box4, box5, box6],
	[box7, box8, box9],
  	[box1, box4, box7],
	[box2, box5, box8],
	[box3, box6, box9],
	[box1, box5, box9],
	[box3, box5, box7]
]

const gridCells = document.querySelectorAll(".grid-item");

const players = [
  {
    playerTurn: false,
    playerChoice: "X" 
  },
	{
	  playerTurn: false,
	  playerChoice: "O"
  },
  {
    Winner: false
  }
]

const playerX = players[0];
const playerO = players[1];

// 2) Define required variables used to track the state of the game

let gameStatus = null;

let messageDiv = document.querySelector(".message");

// Add Event Listeners

reset.addEventListener("click", initialize);

window.addEventListener("click", render);
setTimeout(render, 500);

// Define Required Functions

function initialize() {
	gridCells.forEach((cell) => {
		cell.classList.remove("active");
		cell.textContent = "";
		cell.addEventListener("click", playerMove);
	});
	playerX.playerTurn = true;
	gameStatus = "Playing";
	debugger;
	render();
}

function gameOver() {
	gridCells.forEach((cell) => {
		cell.classList.add("active");
	});
}

function checkWinner() {
	for (let i = 0; i < winningCombos.length; i++) {
		if (
			winningCombos[i][0].textContent === playerX.playerChoice
			&& winningCombos[i][1].textContent === playerX.playerChoice
			&& winningCombos[i][2].textContent === playerX.playerChoice
      	) 
		{
			gameStatus = "Win X";
			gameOver();	
      	} 
		else if (
			winningCombos[i][0].textContent === playerO.playerChoice
			&& winningCombos[i][1].textContent === playerO.playerChoice
			&& winningCombos[i][2].textContent === playerO.playerChoice
		) 
		{
			gameStatus = "Win O";
			gameOver();	
		}
  	}
  
  let count = 0;
  for (let cell of gridCells) {
	  if (cell.classList.contains("active")) {
		  count++;
    	}
  	}
    
  if (count === 9) {
    gameStatus = "Tie";
  } else {
	gameStatus = "Playing";
  }
}

function playerMove(evt) {
	if (playerX.playerTurn) {
		while (!evt.target.classList.contains("active")) {
			evt.target.classList.add("active");
	    	evt.target.innerText = playerX.playerChoice
    	}
		playerX.playerTurn = false;
		playerO.playerTurn = true;
  	} else {
		while (!evt.target.classList.contains("active")) {
			evt.target.classList.add("active");
	    	evt.target.innerText = playerO.playerChoice;
    	}
    	playerX.playerTurn = true;
	  	playerO.playerTurn = false;
  	}
	checkWinner();
}

function message() {
	if (gameStatus === "Win X"){
		messageDiv.textContent = "Congratulations Player X!";
  	} else if (gameStatus === "Win O") {
	  	messageDiv.textContent = "Congratulations Player O!";
  	} else if (gameStatus === "Tie") {
	  	messageDiv.textContent = "It's a tie!";
  	} else if (gameStatus === "Playing") {
		if (playerX.playerTurn) {
			messageDiv.textContent = "It's Player X's Turn!";
    	} else {
	    	messageDiv.textContent = "It's Player O's Turn!";
    	}
  	}
}

function render(){
	message();
	playerMove();
}


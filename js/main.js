/*----- cached element references -----*/

// Initialize the divs' reference
const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");
const box4 = document.getElementById("box4");
const box5 = document.getElementById("box5");
const box6 = document.getElementById("box6");
const box7 = document.getElementById("box7");
const box8 = document.getElementById("box8");
const box9 = document.getElementById("box9");

// Initialize the reset reference
const reset = document.getElementById("reset");

// Initialize the grid container reference
const gridCells = document.querySelectorAll(".grid-item");

/*----- constants -----*/

// Initialize the winning combinations array 
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

// Initialize the players
const players = [
	{
	  playerTurn: false,
	  playerChoice: "X" 
	},
	  {
		playerTurn: false,
		playerChoice: "O"
	}
  ]

// Set the player objects
const playerX = players[0];
const playerO = players[1];

/*----- app's state (variables) -----*/

// Intialize the gameStatus to null
let gameStatus = null;

// Set messageDiv variable to access the message div
let messageDiv = document.querySelector(".message");

/*----- event listeners -----*/

// Event listener for the reset button to initialize the game
reset.addEventListener("click", initialize);

// Event listener for the window to render the state
window.addEventListener("click", render);

/*----- functions -----*/

// Call the render function every 0.5 seconds
setTimeout(render, 500);

// Function to initialize the start of a game
function initialize() {
	// For each cell in the grid
	gridCells.forEach((cell) => {
		// Remove the active class
		cell.classList.remove("active");
		// Set the content to empty
		cell.textContent = "";
		// Add an event listener to notify when a player has made a move
		cell.addEventListener("click", playerMove);
	});
	// Initialize the first player to be X
	playerX.playerTurn = true;
	// Set the game status to playing
	gameStatus = "Playing";
	// Render the game
	render();
}

// Function to disable the cells in the game (ie. all become in "use")
function gameOver() {
	gridCells.forEach((cell) => {
		cell.classList.add("active");
	});
}

// Function to check for a winner, or a tie, or if neither
function checkWinner() {
	// Check if all cells are active
	let count = 0;
	for (let cell of gridCells) {
		if (cell.classList.contains("active")) {
			count++;
		  }
		}
	// If all cells are active and no winner is found below, there's a tie (ie. gameStatus remains "tie")
	if (count === 9) {
	  gameStatus = "Tie";
	// Otherwise the game is still going
	} else {
	  gameStatus = "Playing";
	}
	
	// Iterate through all winning combos to see if a winner exists
	for (let i = 0; i < winningCombos.length; i++) {
		if (
			winningCombos[i][0].textContent === playerX.playerChoice
			&& winningCombos[i][1].textContent === playerX.playerChoice
			&& winningCombos[i][2].textContent === playerX.playerChoice
      	) 
		{
			// If a winner, set the board to game over
			gameStatus = "Win X";
			gameOver();	
      	} 
		else if (
			winningCombos[i][0].textContent === playerO.playerChoice
			&& winningCombos[i][1].textContent === playerO.playerChoice
			&& winningCombos[i][2].textContent === playerO.playerChoice
		) 
		{
			// If a winner, set the board to game over
			gameStatus = "Win O";
			gameOver();	
		}
  	}
}

// Function to handle which player's move
function playerMove(evt) {
	// If it's player X's turn
	if (playerX.playerTurn) {
		// If event has occured
		if (evt !== undefined) {
			// If the cell is not already active
			if (!evt.target.classList.contains("active")) {
				// Add the active class to the cell
				evt.target.classList.add("active");
				// Insert the player's move
				evt.target.innerText = playerX.playerChoice
				// End the current player's turn
				playerX.playerTurn = false;
				// Set the next player's turn
				playerO.playerTurn = true;
			}
		}
	// Otherwise it's player O's turn
  	} else {
		// If event has occured
		if (evt !== undefined) {
			// If the cell is not already active
			if (!evt.target.classList.contains("active")) {
				// Add the active class to the cell
				evt.target.classList.add("active");
				// Insert the player's move
				evt.target.innerText = playerO.playerChoice;
				// End the current player's turn
				playerX.playerTurn = true;
				// Set the next player's turn
	  			playerO.playerTurn = false;
			}
		}
  	}
	// Check if a winner exists
	checkWinner();
}

// Function to output the messages
function message() {
	// If player X wins
	if (gameStatus === "Win X"){
		messageDiv.textContent = "Congratulations Player X!";
	// If player O wins
  	} else if (gameStatus === "Win O") {
	  	messageDiv.textContent = "Congratulations Player O!";
	// If there's a tie
  	} else if (gameStatus === "Tie") {
	  	messageDiv.textContent = "It's a tie!";
	// If the game is still going, whose turn it is
  	} else if (gameStatus === "Playing") {
		if (playerX.playerTurn) {
			messageDiv.textContent = "It's Player X's Turn!";
    	} else {
	    	messageDiv.textContent = "It's Player O's Turn!";
    	}
  	}
}

// Function to render the current state
function render(){
	message();
	playerMove();
}


Const box1 = document.getElementById(“box1”);
Const box2 = document.getElementById(“box2”);
Const box3 = document.getElementById(“box3”);
Const box4 = document.getElementById(“box4”);
Const box5 = document.getElementById(“box5”);
Const box6 = document.getElementById(“box6”);
Const box7 = document.getElementById(“box7”);
Const box8 = document.getElementById(“box8”);
Const box9 = document.getElementById(“box9”);

Const winningCombos = [
	[box1, box2, box3],
	[box4, box5, box6],
	[box7, box8, box9],
[box1, box4, box7],
	[box2, box5, box8],
	[box3, box6, box9],
	[box1, box5, box9],
	[box3, box5, box7]
]

Const gridCells = document.querySelectorAll(“.grid-item”);

Const players = [
{
playerTurn: false,
playerChoice: ‘X’ 
},
	{
	playerTurn: false,
	playerChoice: ‘O’
},
{
Winner: false
}
]

Const playerX = players[0];
Const playerO = players[1];

let gameStatus = null;
// [“win”, “tie”, “playing”]



// active class for when the cell has been filled/used

Let messageDiv = document.querySelector(“.message”);

Function initialize() {
	gridCells.forEach((cell) => {
		cell.classList.remove(“active”);
cell.textContent = “”;
cell.addEventListener(“click”, playerMove)
});
playerX.playerTurn = true;
gameStatus = “Playing”;
render();
}

Function gameOver() {
gridCells.forEach((cell) => {
	cell.classList.add(“active”);
}
}

Function checkWinner() {
	For (let i = 0; i < winningCombos.length; i++) {
		If (
winningCombos[i][0].textContent === playerX.playerChoice
&& winningCombos[i][1].textContent === playerX.playerChoice
&& winningCombos[i][2].textContent === playerX.playerChoice
) { gameStatus = “Win X”
    gameOver();	
}
Else if (
	winningCombos[i][0].textContent === playerO.playerChoice
&& winningCombos[i][1].textContent === playerO.playerChoice
&& winningCombos[i][2].textContent === playerO.playerChoice
) { gameStatus = “Win O”
    gameOver();	
}
) 
}
Let count = 0;
For (let cell of gridCells) {
	If cell.classList.contains(“active”) {
		Count++;
}
If (count === 9) {
 gameStatus = “Tie”;
} Else {
	gameStatus = “Playing”;
}

}

Function playerMove() {
	If (playerX.playerTurn) {
		while (!target.classList.contains(“active”)) {
		target.classList.add(“active”);
	target.innerText = playerX.playerChoice
}
	playerX.playerTurn = false;
	playerO.playerTurn = true;
} Else {
	while (!target.classList.contains(“active”)) {
target.classList.add(“active”);
	target.innerText = playerO.playerChoice;
}
playerX.playerTurn = true;
	playerO.playerTurn = false;
}
}

Function message() {
	If (gameStatus === “Win X”){
		messageDiv.textContent =`Congratulations Player X!`;
	Else if (gameStatus === “Win O” {
	messageDiv.textContent =`Congratulations Player O!`;
} Else if (gameStatus === “Tie”) {
	messageDiv.textContent =`It’s a tie!`;
} Else if (gameStatus === “Playing) {
	If (playerX.playerTurn) {
		messageDiv.textContent =`It’s Player X’s Turn!`;
} Else {
	messageDiv.textContent =`It’s Player O’s Turn!`;
}
}


window.addEventListener(“click”, render);
setTimeout(render, 500);

Function render(){
	message();
	playerMove();
	checkWinner();
message();
}

let originalBoard;
const realPlayer = 'X';
const computerPlayer = 'O';
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const cells= document.querySelectorAll('.cell');
/* stores a reference to each cell*/ 

startGame(); /* calls this to start the game*/

function startGame() { /*this happens when the game starts */ 
    document.querySelector('.endGame').style.display = "none"
    originalBoard = Array.from(Array(9).keys()) /*create an array of nine elements and just the keys of the elements */
    for (let i = 0; i < cells.length; i++) {    
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color'); /*each winning cell is highleghted and win game restarts, background color will disappear */
        cells[i].addEventListener('click', turnClick, false);
     }
} /*when player clicks a square, it calls the turnClick function */

function turnClick(square) {
    turn(square.target.id, realPlayer) 
}

function turn(square, player) {
    originalBoard[square] = player; /*allows player to click the board and X appears */
    document.getElementById(square).innerText = player;
}


let gameBoard; /*set variable for game board*/
const realPlayer = 'X'; /*player is X */
const computer = 'O'; /* player plays against the computer*/
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
    gameBoard = Array.from(Array(9).keys()) /*create an array of nine 
    elements and just the keys of the elements; The keys() method returns a new array iterator 
    object that contains the keys for each index in the array - array.prototype.keys */
    for (let i = 0; i < cells.length; i++) {    
        cells[i].innerText = ''; /*nothing in cell at start of game */
        cells[i].style.removeProperty('background-color'); /*each winning cell is 
        highlighted and win game restarts, background color will disappear */
        cells[i].addEventListener('click', turnClick, false); /*when player clicks a square, it calls the turnClick function */
     }
} 

function turnClick(square) {
    if (typeof gameBoard[square.target.id] == 'number') { /* an index without an X or O is playable
    'number' is number if index; when index gets replaced with X or O*/
    turn(square.target.id, realPlayer) 
    if (!checkTie())turn(bestSpot(), computer);
      /*checking for tie; if nobody has played the spot, it will be 
    possible to play the spot*/    
    }
}
    
function turn(squareId, player) {
    gameBoard[squareId] = player; /*allows player to click the board and X appears */
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(gameBoard, player) /*checking for specific player win */
    if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) { /*passing in original board*/
    let plays = board.reduce((a, e, i) => /*this is to find all places where the board has been played; 
    will give back accumulator (a) at the end of game; we are going through the elements (e) in the board,  */
        (e === player) ? a.concat(i) : a, []) /* a is the accumulator, e is the element, i is the index; 
        concat means we will add X to array; using conditional ternary operator: if the element 
        is equal to the player, we will concat the accumulator and add it to the array; if the element is not equal to the
        player we will return it;   */ 
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) { /*loops through every winning combo and gets the index 
    and the win*/
        if (win.every (elem => plays.indexOf(elem) > -1)) { /* the plays are all places the 
        player has played on the board */
         gameWon = {index: index, player : player}; /*this tells which array combo won and which player won */  
         break; /*if nobody wins game is null; if there's a winner,
         it's game won with which player won.*/ 
        }
    }
    return gameWon;
}

function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) { /*goes through every element of win combo*/
        document.getElementById(index).style.backgroundColor = 
        gameWon.player == realPlayer ? "green" : "yellow"; 
    } /*if the real player wins, the winning combo turns green, 
    if the computer wins, the winning combo turns yellow */
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    } /*turnClick is set to false, because the game is over, and
    a player cannot try to click another box */

    declareWinner(gameWon.player == realPlayer ? "You Win!" : "You lose! Better luck next time.")
}

function declareWinner(who) { /*declares if winner is computer or player */
    document.querySelector(".endGame").style.display = "block";
    document.querySelector(".endGame .text").innerText = who;
}

function emptySquares() {
    return gameBoard.filter(s => typeof (s) == 'number') /*all numbered squares are empty; 
    X or O is not empty */
} /*all empty squares are a number X and O squares are not empty */

function bestSpot() { /*will find first square that is not empty, and get element of first empty squares
so a player can play in an empty square*/
    return emptySquares() [0];
}

function checkTie() {
    if (emptySquares().length == 0) { /*this means all squares are filled up and 
    it's a tie */
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = "blue"; /* if there is a tie, it turns yellow*/
        cells[i].removeEventListener('click', turnClick, false); /*player can no longer click any squares*/
        declareWinner("It's a Tie!")
        return true; /*this returns true if there is a tie */
    }
    return false; /*this returns false if there is not a tie */
    }
}



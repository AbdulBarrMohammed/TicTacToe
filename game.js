
// screen tic tac toe board
const ticBoard = document.querySelector('.board');
const boardCells = ticBoard.querySelectorAll('div');

const turnText = document.querySelector('.turn');
const restartButton = document.querySelector('button');

const sleep = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds);
    })
}

let playerTurn = 'X';
const arrayBoard = [
    ['','',''],
    ['','',''],
    ['','','']
]

function clearScreenBoard(boardCell) {
    boardCell.forEach((div, index) => {
        div.innerHTML = '';
    });
}
function getIndexes(cell) {
    if (cell === 'one') {
        return [0,0];
    }
    else if (cell === 'two') {
        return [0, 1];
    }
    else if (cell === 'three') {
        return [0,2];
    }
    else if (cell === 'four') {
        return [1,0];
    }
    else if (cell === 'five') {
        return [1,1];
    }
    else if (cell === 'six') {
        return [1,2];
    }
    else if (cell === 'seven') {
        return [2,0];
    }
    else if (cell === 'eight') {
        return [2,1];
    }
    else if (cell === 'nine') {
        return [2,2];
    }

}

const boardGame = GameBoard(arrayBoard);
restartButton.addEventListener('click', function(e) {
    clearScreenBoard(boardCells);
    boardGame.clearBoard();
    playerTurn = 'X';
    turnText.textContent = "It's players X's turn";


});

ticBoard.addEventListener("click", async function(e) {
    const cellPlaced = e.target.id;
    const currentIndex = getIndexes(cellPlaced);
    const indexOne = currentIndex[0];
    const indexTwo = currentIndex[1];
    if (boardGame.cellIsEmpty(indexOne, indexTwo))  {
        boardGame.placeOnBoard(playerTurn, cellPlaced);
        e.target.innerHTML = playerTurn;

        if (boardGame.checkWinner('X')) {
            await sleep(100);
            turnText.textContent = 'X WON !!!';
            playerTurn = '';
            return;

        }

        if (boardGame.checkWinner('O')) {
            await sleep(100);
            turnText.textContent = '0 WON !!!';
            playerTurn = '';
            return;
        }

        if (playerTurn == 'X') {
            playerTurn = 'O';
        }
        else {
            playerTurn = 'X';
        }
        turnText.textContent = `It's player ${playerTurn}'s turn`;
    }
    else {
        console.log('space already taken');
    }
    console.log(arrayBoard);


})

function GameBoard(arrayBoard) {

    const winner = '';

    const clearBoard = () => {
        for (let i = 0; i < arrayBoard.length; i++) {
            for (let j = 0; j < arrayBoard.length; j++) {
                arrayBoard[i][j] = '';
            }
        }
    }

    const cellIsEmpty = (indexOne, indexTwo) => {
        if(arrayBoard[indexOne][indexTwo] === '') {
            return true;
        }
        return false;
    }

    const checkWinner = (letter) => {
        //check horizontal
        for (let i = 0; i < arrayBoard.length; i++) {
            if (arrayBoard[i][0] == letter && arrayBoard[i][1] == letter && arrayBoard[i][2] == letter) {
                return true;
            }
        }
        //check vertical
        for (let i = 0; i < arrayBoard.length; i++) {
            if (arrayBoard[0][i] == letter && arrayBoard[1][i] == letter && arrayBoard[2][i] == letter) {
                return true;
            }
        }
        //check diagonal
        if (arrayBoard[0][0] == letter && arrayBoard[1][1] == letter && arrayBoard[2][2] == letter) {
            return true;

        }
        if (arrayBoard[0][2] == letter && arrayBoard[1][1] == letter && arrayBoard[2][0] == letter) {
            return true;
        }

        return false;
    }


    const placeOnBoard = (letter, cell) => {
        if (cell === 'one') {
            arrayBoard[0][0] = letter;
        }
        else if (cell === 'two') {
            arrayBoard[0][1] = letter;
        }
        else if (cell === 'three') {
            arrayBoard[0][2] = letter;
        }
        else if (cell === 'four') {
            arrayBoard[1][0] = letter;
        }
        else if (cell === 'five') {
            arrayBoard[1][1] = letter;
        }
        else if (cell === 'six') {
            arrayBoard[1][2] = letter;
        }
        else if (cell === 'seven') {
            arrayBoard[2][0] = letter;
        }
        else if (cell === 'eight') {
            arrayBoard[2][1] = letter;
        }
        else if (cell === 'nine') {
            arrayBoard[2][2] = letter;
        }

    }

    return { placeOnBoard, checkWinner, cellIsEmpty, clearBoard}

}

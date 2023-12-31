const GameBoard = (() => {
    let gameBoard = ['', '', '', '', '', '', '', '', '']
    const render = () => {
        let boardHTML = '';
        gameBoard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`
        });
        document.querySelector("#gameboard").innerHTML = boardHTML;
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener("click", Game.handleClick)
        })
    }
    const update = (index, value) => {
        gameBoard[index] = value
        render();
    }

    const getGameboard = () => gameBoard

    return {
        render, update, getGameboard
    }
})()

const createPlayer = (name, symbol) => {
    return {
        name,
        symbol,
    }
}

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            createPlayer(document.querySelector('#player1').value, "X"),
            createPlayer(document.querySelector('#player2').value, "O")
        ]
        currentPlayerIndex = 0;
        gameOver = false
        GameBoard.render(gameReset(GameBoard.getGameboard()));
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener("click", handleClick)
        })
    }
    const handleClick = (event) => {
        let index = parseInt(event.target.id.split("-")[1]);

        if (GameBoard.getGameboard()[index] !== '')
            return;
        GameBoard.update(index, players[currentPlayerIndex].symbol);

        if (checkForWinner(GameBoard.getGameboard(), players[currentPlayerIndex].symbol)) {
            gameOver = true
            gameReset(GameBoard.getGameboard())
            showResult(players, currentPlayerIndex)
        } else if (checkForTie(GameBoard.getGameboard())) {
            gameOver = true
            gameReset(GameBoard.getGameboard())
            let resultHTML = '';
            resultHTML = resultHTML += `<div id="tie"> It is a tie</div>`
            document.querySelector("#endMessage").innerHTML = resultHTML;

        }
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0
    }
    const gameReset = () => {
        for (let i = 0; i < 9; i++) {
            GameBoard.update(i, '')
        }
        GameBoard.render()
    }

    return {
        start, handleClick, gameReset
    }
})();


function checkForWinner(board) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true
        }
    }
    return false
}

function checkForTie(board) {
    return board.every(cell => cell !== "")
}

const showResult = (players, currentPlayerIndex) => {
    let resultHTML = '';
    if (players[currentPlayerIndex].name !== '') {
        resultHTML = resultHTML += `<div id="results"> ${players[currentPlayerIndex].name} is the winner!</div>`
        document.querySelector("#endMessage").innerHTML = resultHTML;
    }
    else
        resultHTML = resultHTML += `<div id="results"> ${players[currentPlayerIndex].symbol} is the winner!</div>`
    document.querySelector("#endMessage").innerHTML = resultHTML;

}


const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", () => {
    Game.gameReset()
    document.querySelector("#endMessage").innerHTML = ''
})


const startButton = document.querySelector('#start-button');
startButton.addEventListener("click", () => {
    Game.start()
    document.querySelector("#endMessage").innerHTML = ''

})
const GameBoard = (() => {
    let gameBoard = ['', '', '', '', '', '', '', '', ''];

    const player = (name, symbol, turn) => {
        return { name, symbol, turn };
    };

    const player1 = player('player 1', "X", true);
    const player2 = player('player 2', "O", false);

    const playerMove = (function () {
        const square = document.querySelectorAll('.square');
        square.forEach(square => {
            square.addEventListener('click', event => {
                if (player1.turn == true && event.target.textContent == '') {
                    square.textContent = player1.symbol
                    player1.turn = false
                    player2.turn = true
                }
                else if (player2.turn == true && event.target.textContent == '') {
                    square.textContent = player2.symbol
                    player2.turn = false
                    player1.turn = true
                }
            })
        })
    })


    const render = () => {
        let boardHTML = '';
        gameBoard.forEach((square, index) => {
            boardHTML += `<div class="square" id=square-${index}">${square}</div>`
        });
        document.querySelector("#gameboard").innerHTML = boardHTML;
    }
    return {
        render, playerMove
    }

})();

const Player1 = (() => {

})();

// const Player2 = {
//     player2: 'player2'
// }

// const GameFlow {

// }
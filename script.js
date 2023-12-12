const GameBoard = (() => {
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    console.log(gameBoard)

    const render = () => {
        let boardHTML = '';
        gameBoard.forEach((square, index) => {
            boardHTML += `<div class="square" id=square-${index}">${square}</div>`
        });
        document.querySelector("#gameboard").innerHTML = boardHTML;
    }
    return {
        render
    }
})();

// const Player1 = {
//     player1: 'player1'
// }

// const Player2 = {
//     player2: 'player2'
// }

// const GameFlow {

// }
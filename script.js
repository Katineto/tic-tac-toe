const tictactoe = require('./game')
const view = require('./view')

const player1Input = document.getElementById('player1')
const player2Input = document.getElementById('player2')
const createGameBtn = document.getElementById('create-game-btn')

let player1
let player2


function startNewGame() {
    player1 = tictactoe.createPlayer(player1Input.value || 'First player')
    player2 = tictactoe.createPlayer(player1Input.value || 'Second player')
    const game = tictactoe.createGame(player1, player2)
    view.renderBoard(game)
}
createGameBtn.addEventListener('click', startNewGame)

import { createPlayer, createGame } from './game.js';
import { renderBoard, renderPlayers } from './view.js';

const player1Input = document.getElementById('player1')
const player2Input = document.getElementById('player2')
const createGameBtn = document.getElementById('create-game-btn')

let player1
let player2

function startNewGame() {
    player1 = createPlayer(player1Input.value || 'First player')
    player2 = createPlayer(player2Input.value || 'Second player')
    console.log(player1, player2)
    const game = createGame(player1, player2)
    renderBoard(game)
    renderPlayers(player1, player2)
}
createGameBtn.addEventListener('click', startNewGame)

import { createPlayer, createGame } from './game.js';
import { renderBoard, renderPlayers } from './view.js';

const player1Input = document.getElementById('player1')
const player2Input = document.getElementById('player2')
const createGameBtn = document.getElementById('create-game-btn')
const newRoundBtn = document.getElementById('restart')


function startNewGame() {
    let player1 = createPlayer(player1Input.value || 'First player')
    let player2 = createPlayer(player2Input.value || 'Second player')
    const game = createGame(player1, player2)
    renderBoard(game)
    renderPlayers(player1, player2)
    
    newRoundBtn.addEventListener('click', () => {
        newRound(player1, player2)
    })
}
function newRound(p1, p2) {
    const newGame = createGame(p1, p2)
    renderBoard(newGame)
}
createGameBtn.addEventListener('click', startNewGame)

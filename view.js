
export const renderBoard = (game) => {
    const boardDiv = document.getElementById('board')
    while (boardDiv.lastChild) {
        boardDiv.removeChild(boardDiv.lastChild)
    }
    const cells = game.getBoard()
    const currentPlayerName = game.getCurrentPlayer().name
    const isDraw = game.isDraw()
    const message = document.getElementById('message')
    const turnIndicator = document.getElementById('turn')
    const playerID = game.getCurrentPlayer().id
    turnIndicator.innerText = `${currentPlayerName}'s turn`
    turnIndicator.classList.remove('hidden')

    if(isDraw == false){
        message.classList.add('hidden')
    }
    for (let i = 0; i < cells.length; i++) {
        const cell = document.createElement('div')
        cell.setAttribute('id', `${i}`)
        if(cells[i] == 0) {
            cell.innerText = ''
            if(playerID == 1) cell.classList.add('hover-blue')
            else cell.classList.add('hover-red')
        }
        else if(cells[i] == 1) {
            cell.innerText = 'X'
            cell.classList.add('blue')
        }
        else {
            cell.innerText = 'O'
            cell.classList.add('red')
        }
        boardDiv.appendChild(cell)
        
        if(game.isDone() == false && isDraw == false) {
            cell.addEventListener('click', () => {
                game.turn(i)
                renderBoard(game)
            })
        }
        else if(game.isDone() && isDraw == false) {
            message.innerText = `${currentPlayerName} wins!`
            message.classList.remove('hidden')
            turnIndicator.classList.add('hidden')
        }
    }
    if(isDraw && game.isDone() == false) {
        message.classList.remove('hidden')
        message.innerText = `It's a draw!`
        turnIndicator.classList.add('hidden')
    }
    updateScore(game.getCurrentPlayer())
}
export const renderPlayers = (p1, p2) => {
    const p1Name = document.getElementById('p1-name')
    const p2Name = document.getElementById('p2-name')
    const p1Score = document.getElementById('p1-score')
    const p2Score = document.getElementById('p2-score')
    p1Name.innerText = p1.name
    p1Name.classList.add('blue')
    p2Name.innerText = p2.name
    p2Name.classList.add('red')
    p1Score.innerText = p1.score()
    p2Score.innerText = p2.score()
}
export const hideStartGamePanel = () => {
    const startGame = document.getElementById('start-game')
    startGame.classList.add('collapsed')
}
const updateScore = (winner) => {
    if(winner.id == 1) {
        const p1Score = document.getElementById('p1-score')
        p1Score.innerText = winner.score()
    }
    if(winner.id == 2) {
        const p2Score = document.getElementById('p2-score')
        p2Score.innerText = winner.score()
    }
}
export const renderBoard = (game) => {
    const boardDiv = document.getElementById('board')
    while (boardDiv.lastChild) {
        boardDiv.removeChild(boardDiv.lastChild)
    }
    const cells = game.getBoard()
    for (let i = 0; i < cells.length; i++) {
        const cell = document.createElement('div')
        cell.setAttribute('id', `${i}`)
        //populate cells with symbols
        if(cells[i] == 0) {
            cell.innerText = ''
        }
        else if(cells[i] == 1) cell.innerText = 'X'
        else cell.innerText = 'O'
        boardDiv.appendChild(cell)
        if(game.isDone() == false) {
            cell.addEventListener('click', () => {
                game.turn(i)
                renderBoard(game)
            })
        }
    }
    updateScore(game.getCurrentPlayer())
}
export const renderPlayers = (p1, p2) => {
    const p1Name = document.getElementById('p1-name')
    const p2Name = document.getElementById('p2-name')
    const p1Score = document.getElementById('p1-score')
    const p2Score = document.getElementById('p2-score')
    p1Name.innerText = p1.name
    p2Name.innerText = p2.name
    p1Score.innerText = p1.score()
    p2Score.innerText = p2.score()
}
const updateScore = (winner) => {
    console.log(winner.score())
    if(winner.id == 1) {
        const p1Score = document.getElementById('p1-score')
        p1Score.innerText = winner.score()
    }
    if(winner.id ==2) {
        const p2Score = document.getElementById('p2-score')
        p2Score.innerText = winner.score()
    }
}
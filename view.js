const renderBoard = (game) => {
    const boardDiv = document.getElementById('board')
    while (boardDiv.lastChild) {
        boardDiv.removeChild(boardDiv.lastChild)
    }
    const cells = game.getBoard()
    for (let i = 0; i < cells.length; i++) {
        const cell = document.createElement('div')
        cell.setAttribute('id', `${i}`)
        //inner text doesn't show
        if(cells[i] == 0) cell.innerText = ''
        else if(cells[i] == 1) cell.innerText = 'X'
        else cell.innerText = 'O'
        boardDiv.appendChild(cell)
        cell.addEventListener('click', () => game.turn(i))
    }
}

module.exports = {
    renderBoard
}
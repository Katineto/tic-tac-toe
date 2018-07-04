const createBoard = () => {
    let cells = [0,0,0,0,0,0,0,0,0]
    return {
        cells: () => cells.slice(0),
        mark1: (position) => {
            cells[position] = 1
            console.log(cells)
        },
        mark2: (position) => {
            cells[position] = 2
            console.log(cells)
        },
        isEmptyCell: (position) => {
            return cells[position] == 0 ? true : false
        }
    }    
}

const playerBuilder = () => {
    let lastId = 0
    return (name) => {
        lastId += 1
        return {
            name,
            id: lastId
        }
    }
}

const createGame = (p1, p2) => {
    const board = createBoard()
    let currentPlayer = p1
    return {
        getBoard: () => board.cells(),
        turn: (position) => {
            if(board.isEmptyCell(position)) {
                if(currentPlayer == p1) {
                    board.mark1(position)
                    currentPlayer = p2
                }
                else {
                    board.mark2(position)
                    currentPlayer = p1
                }
            }
            else console.log('This cell is taken.') 
        }
    }
}

const renderBoard = (cells) => {
    const boardDiv = document.getElementById('board')
    while (boardDiv.lastChild) {
        boardDiv.removeChild(boardDiv.lastChild)
    }
    for (let i = 0; i < cells.length; i++) {
        const cell = document.createElement('div')
        cell.setAttribute('id', `${i}`)
        if(cells[i] == 0) cell.innerText = ''
        else if(cells[i] == 1) cell.innerText = 'X'
        else cell.innerText = 'O'
        // cell.innerText = cells[i]
        boardDiv.appendChild(cell)
    }
}

const createPlayer = playerBuilder()
const player1 = createPlayer('P1')
const player2 = createPlayer('P2')

const game = createGame(player1, player2)

renderBoard(game.getBoard())
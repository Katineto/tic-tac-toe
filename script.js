const patterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8],   // horizontal
                  [0, 3, 6], [1, 4, 7], [2, 5, 8],   // vertical
                  [0, 4, 8], [2, 4, 6]]              // diagonal
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
        },
        checkWin: () => {
            const currentBoard = getBoard()
            let playerMarks = []
            for(let i = 0; i < currentBoard.length; i++) {
                if(currentBoard[i] == currentPlayer.id) {
                    playerMarks.push(i)
                } 
            }
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
        boardDiv.appendChild(cell)
    }
}

const createPlayer = playerBuilder()
const player1 = createPlayer('P1')
const player2 = createPlayer('P2')

const game = createGame(player1, player2)

renderBoard(game.getBoard())
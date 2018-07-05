
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
const createPlayer = playerBuilder()

const createGame = (p1, p2) => {
    const board = createBoard()
    let currentPlayer = p1
    return {
        switchPlayer: () => {
            if(currentPlayer == p1) currentPlayer = p2
            else currentPlayer = p1
        },
        turn: (position) => {
            if(board.isEmptyCell(position)) {
                if(currentPlayer == p1) {
                    board.mark1(position)
                }
                else {
                    board.mark2(position)
                }
            }
            else console.log('This cell is taken.') 
        },
        checkWin: () => {
            const currentBoard = board.cells()
            let hasWinningPattern = false
            let playerMarks = []
            for(let i = 0; i < currentBoard.length; i++) {
                if(currentBoard[i] == currentPlayer.id) {
                    playerMarks.push(i)
                } 
            }
            console.log(`player marks: ${playerMarks}`)
            if(playerMarks.length >= 3) {
                patterns.forEach(pattern => {
                    if(pattern.every(cell => playerMarks.indexOf(cell)) != -1) {
                        hasWinningPattern = true
                    }
                })
            }
            return hasWinningPattern
        }
    }
}

module.exports = {
    createBoard,
    createGame,
    createPlayer
}
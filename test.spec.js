import { createBoard, createPlayer, createGame } from '../game.mjs';

describe('Create board', () => {
    it('creates an empty board', () => {
        const board = createBoard().cells()
        expect(board).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0])
    })
})
describe('Check win condition', () => {
    it('checks win condition', () => {
        const checkWinningPattern = (playerMarks) => {
            let hasWinningPatter = false
            const patterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8],   // horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8],   // vertical
            [0, 4, 8], [2, 4, 6]]              // diagonal
            
            if(playerMarks.length >= 3) {
                patterns.forEach(pattern => {
                    if(pattern.every(cell => playerMarks.indexOf(cell)) != -1) {
                        hasWinningPattern = true
                        console.log('checkWin changed hasWinningPattern to true')
                    }
                })
            }
            return hasWinningPattern
        }
        
        expect(checkWinningPattern([0, 1, 7])).toBe(false)
    })
})
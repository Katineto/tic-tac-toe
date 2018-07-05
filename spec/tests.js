const tictactoe = require('../game')

describe('Create board', () => {
    it('creates an empty board', () => {
        const board = tictactoe.createBoard().cells()
        expect(board).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0])
    })
})
describe('Check win condition', () => {
    it('checks win condition', () => {
        const player1 = tictactoe.createPlayer('player1')
        const player2 = tictactoe.createPlayer('player2')
        const game = tictactoe.createGame(player1, player2)
        game.turn(0)
        game.switchPlayer()
        game.turn(8)
        game.switchPlayer()
        game.turn(1)
        game.switchPlayer()
        game.turn(7)
        game.switchPlayer()
        game.turn(2)
        const checkWin = game.checkWin()
        expect(checkWin).toBe(true)
    })
})
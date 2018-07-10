import test from 'ava'

test('first test', t => {
    t.pass()
})

const checkWinningPattern = (playerMarks) => {
    const patterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8],   // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8],   // vertical
    [0, 4, 8], [2, 4, 6]]              // diagonal
    
    let hasWinningPattern = false
    if(playerMarks.length >= 3) {
        patterns.forEach(pattern => {
            if(pattern.every(cell => playerMarks.indexOf(cell) != -1)) {
                return hasWinningPattern = true
            }
        })
    }
    return hasWinningPattern    
}
test('Check player marks against winning patterns: false marks', t => {
    t.false(checkWinningPattern([0, 7, 8]))
})

test('Check player marks against winning patterns: true marks', t => {
    t.true(checkWinningPattern([0, 1, 2]))
})

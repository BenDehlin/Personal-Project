let players = []

const neighbors = [
  [1, 0],
  [1, 1],
  [1, -1],
  [0, 1],
  [0, -1],
  [-1, 0],
  [-1, 1],
  [-1, -1]
]

const checkNeighbors = ({ x, y, grid, boardState }) => {
  const { rows, columns } = boardState
  let count = 0
  neighbors.forEach(([newX, newY]) => {
    if (
      x + newX >= 0 &&
      x + newX < rows &&
      y + newY >= 0 &&
      y + newY < columns
    ) {
      grid[x + newX][y + newY].isBomb ? count++ : null
    }
  })
  return count
}

const clickCell = ({ x, y, grid, boardState }) => {
  if (grid[x][y].isClicked) {
    return [grid, boardState, false]
  }
  const { rows, columns, bombs } = boardState
  if (grid[x][y].isBomb) {
    grid.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        grid[rowIndex][columnIndex].isClicked = true
      })
    })
    boardState.gameRunning = false
    return [grid, boardState, true]
  } else {
    grid[x][y].count = checkNeighbors({ x, y, grid, boardState })
    grid[x][y].isClicked = true
    if (!grid[x][y].isBomb && grid[x][y].count === 0) {
      neighbors.forEach(([newX, newY]) => {
        if (
          x + newX >= 0 &&
          x + newX < rows &&
          y + newY >= 0 &&
          y + newY < columns
        ) {
          [grid, boardState, gameover] = clickCell({ x: x + newX, y: y + newY, grid, boardState })
        }
      })
    }
    return [grid, boardState, false]
  }
}
module.exports = {
  join: async (socket, body) => {
    players.push(body)
    socket.join("multiplayer")
  },
  genGrid: async (io) => {
    let grid = []
    const boardState = {
      rows: 10,
      columns: 10,
      bombs: 25,
      flags: 25,
      score: 0,
      gameRunning: false,
      currentPlayer: players[0].id
    }
    if(players.length === 2){
      boardState.gameRunning = true
      for (let x = 0; x < 10; x++) {
        grid.push([])
        for (let y = 0; y < 10; y++) {
          grid[x].push({
            x,
            y,
            isBomb: false,
            isClicked: false,
            isFlagged: false,
            count: 0
          })
        }
      }
      for (let i = 0; i < 25; i++) {
        let x = Math.floor(Math.random() * 10)
        let y = Math.floor(Math.random() * 10)
        grid[x][y].isBomb ? i-- : (grid[x][y].isBomb = true)
      }
    }
    await io.in("multiplayer").emit("grid", { grid, boardState })
    await io.in('multiplayer').emit('reset')
  },
  clickCell: async (io, socket, body) => {
    const [grid, boardState, gameover] = clickCell(body)
    if(boardState.currentPlayer !== players[0].id){
      boardState.currentPlayer = players[0].id
    }else{
      boardState.currentPlayer = players[1].id
    }
    await io.in("multiplayer").emit("grid", { grid, boardState })
    if (gameover) {
      await io.in("multiplayer").emit("gameover")
    }
  },
  leave: async (io, body) => {
    const {username, id, grid, boardState} = body
    players.splice(
      players.indexOf(player => +player.id === +id),
      1
    )
    boardState.gameRunning = false
    await io.in('multiplayer').emit('grid', {grid, boardState})
  }
}

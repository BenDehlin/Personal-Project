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
      // if (grid[x + newX][y + newY].isBomb) {
      //   count++
      // }
    }
  })
  return count
}

const clickCell = ({ x, y, grid, boardState }) => {
  if (grid[x][y].isClicked) {
    return [grid, boardState, false]
  }
  const { rows, columns } = boardState
  if (grid[x][y].isBomb) {
    // console.log("Bomb!")
    grid.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        grid[rowIndex][columnIndex].isClicked = true
      })
    })
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
          clickCell({ x: x + newX, y: y + newY, grid, boardState })
        }
      })
    }
    return [grid, boardState, false]
  }
}
module.exports = {
  join: async (db, io, socket, body) => {
    players.push(body)
    // console.log(players)
    socket.join("multiplayer")
  },
  move: async (db, io, socket, body) => {
    const { id, username, room, x, y, result } = body
  },
  genGrid: async (io, body, room) => {
    let grid = []
    const boardState = {
      rows: 10,
      columns: 10,
      bombs: 25,
      flags: 25,
      score: 0,
      gameRunning: false,
      currentPlayer: 1
    }
    if(players.length === 2){
      boardState.gameRunning === true
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
        // if (grid[x][y].isBomb) {
        //   i--
        // } else {
        //   grid[x][y].isBomb = true
        // }
      }
    }
    io.in("multiplayer").emit("grid", { grid, boardState })
  },
  clickCell: async (io, socket, body) => {
    const [grid, boardState, gameover] = clickCell(body)
    if(boardState.currentPlayer !== players[0].id){
      boardState.currentPlayer = players[0].id
    }else{
      boardState.currentPlayer = players[1].id
    }
    // players.forEach(player => {
    //   console.log(boardState)
    //   boardState.currentPlayer !== player.id ? boardState.currentPlayer = player.id : null})
    await io.in("multiplayer").emit("grid", { grid, boardState })
    if (gameover) {
      await io.in("multiplayer").emit("gameover")
    }
  },
  leave: async (db, io, socket, body) => {
    const {username, id, grid, boardState} = body
    players.splice(
      players.indexOf(player => +player.id === +body.id),
      1
    )
    boardState.gameRunning = false
    await io.in('multiplayer').emit('grid', {grid, boardState})
  }
}

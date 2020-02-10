module.exports = {
  sendMessage: async(db, io, socket, body, callback) => {
    const {username, room, message} = body
    io.in(room).emit('message', {username, message})
    callback()
  },
  join: async(db, io, socket, body) => {
    const {username, room} = body
    io.in(room).emit('message', {username: 'admin', message: `${username} has joined ${room}.`})
    socket.join(room)
  },
  disconnect: async(db, io) => {
    io.emit('message', {username: 'admin', message: `user has left room.`})
  },
}
module.exports = {
  sendMessage: async(db, io, socket, body, callback) => {
    const {user, room, message} = body
    const newMessage = await db.message.add_message(user.id, room, user.username, message)
    // const messages = await db.message.get_today_messages(room)
    io.in(room).emit('message', {message: newMessage[0]})
    // io.in(room).emit('messages', {messages})
    callback()
  },
  join: async(db, io, socket, body) => {
    const {username, room} = body
    const messages = await db.message.get_today_messages(room)
    io.in(room).emit('message', {username: 'admin', message: `${username} has joined ${room}.`})
    socket.join(room)
    socket.emit('messages', {messages})
  },
  disconnect: async(db, io) => {
    io.emit('message', {username: 'admin', message: `user has left room.`})
  },
}
module.exports = {
  sendMessage: async (db, io, socket, body, callback) => {
    const { user, room, message } = body
    const newMessage = await db.message.add_message(
      user.id,
      room,
      user.username,
      message
    )
    // const messages = await db.message.get_today_messages(room)
    io.in(room).emit("message", { message: newMessage[0] })
    // io.in(room).emit('messages', {messages})
    callback()
  },
  join: async (db, io, socket, body) => {
    const { username, room } = body
    const messages = await db.message.get_today_messages(room)
    io.in(room).emit("message", {
      username: "admin",
      message: {
        username: "ADMIN",
        message_content: `${username} has joined the room.`
      }
    })
    socket.join(room)
    socket.emit("messages", { messages })
  },
  leaving: async(io, body) => {
    io.emit("message", {
      username: "ADMIN",
      message: {username: "ADMIN", message_content: `${body.username} has left room.`}
    })
  }
  ,
  disconnect: async (db, io) => {
    // io.emit("message", {
    //   username: "admin",
    //   message: { username: "ADMIN", message_content: `user has left room.` }
    // })
  }
}

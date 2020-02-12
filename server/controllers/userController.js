module.exports = {
  getUser: async (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    const user = await db.user.get_user(id)
    const rooms = await db.room.get_user_rooms(id)
    const roomRequests = await db.room.get_user_room_requests(id)
    user[0].rooms = rooms
    user[0].roomRequests = roomRequests
    res.status(200).send(user[0])
  },
  getUsers: async (req, res) => {
    db = req.app.get("db")
    const users = await db.user.get_users()
    if (users.length > 0) {
      const newUsers = users.map(user => {
        delete user.hash
        return user
      })
      return res.status(200).send(newUsers)
    }else{
      res.status(200).send(users)
    }
  },
  deleteUser: (req, res) => {}
}
module.exports = {
  getUsersInRoom: (req, res) => {
    const db = req.app.get('db')
    const {chatroom_id} = req.params
    db.room.get_users_in_room(chatroom_id)
    .then(results => res.status(200).send(results))
    .catch(err => res.status(500).send(err))
  },
  approveUserRoom: (req, res) => {
    const db = req.app.get("db")
    const { user_id, chatroom_id } = req.body
    db.room
      .approve_room_request([user_id, chatroom_id])
      .then(() => res.status(200).send("User Approved!"))
      .catch(err => res.status(500).send(err))
  },
  removeUserRoom: (req, res) => {
    const db = req.app.get('db')
    const {user_id, chatroom_id} = req.body
    db.room.remove_user_room([user_id, chatroom_id])
    .then(() => res.status(200).send("User Removed!"))
    .catch(err => res.status(500).send(err))
  },
  createRoom: (req, res) => {
    const db = req.app.get("db")
    const { chatroom_name } = req.body
    db.room
      .create_room(chatroom_name)
      .then(results => res.status(200).send(results))
      .catch(err => res.status(500).send(err))
  },
  deleteRoom: (req, res) => {
    const db = req.app.get("db")
    const { id } = req.params
    db.room
      .delete_room(id)
      .then(() => res.sendStatus(200))
      .catch(err => res.status(500).send(err))
  }
}

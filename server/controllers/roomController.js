module.exports = {
  getRoom: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    db.room.get_room(id)
    .then(results => res.status(200).send(results))
    .catch(err => res.status(500).send(err))
  },
  getAllRooms: (req, res) => {
    const db = req.app.get('db')
    db.room.get_rooms()
    .then(results => res.status(200).send(results))
    .catch(err => res.status(500).send(err))
  },
  getUserRooms: (req, res) => {
    const db = req.app.get('db')
    const user_id = req.session.user.id
    db.room.get_user_rooms(user_id)
    .then(results => res.status(200).send(results))
    .catch(err => res.status(500).send(err))
  },
  createRoom: (req, res) => {
    const db = req.app.get('db')
    const {chatroom_name} = req.body
    db.room.create_room(chatroom_name)
    .then(results => res.status(200).send(results))
    .catch(err => res.status(500).send(err))
  },
  deleteRoom: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    db.room.delete_room(id)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err))
  }
}
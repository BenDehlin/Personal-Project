module.exports = {
  getRoom: (req, res) => {
    const db = req.app.get("db")
    const { id } = req.params
    db.room
      .get_room(id)
      .then(results => res.status(200).send(results))
      .catch(err => res.status(500).send(err))
  },
  requestJoinRoom: async (req, res) => {
    const db = req.app.get("db")
    const user_id = req.session.user.id
    const { chatroom_id } = req.params
    const alreadyRequested = await db.room.check_request_join_room([
      user_id,
      chatroom_id
    ])
    if (alreadyRequested[0]) {
      return res.status(200).send("Already requested, wait for admin approval.")
    }
    db.room
      .request_join_room([user_id, chatroom_id])
      .then(() => {
        res.status(200).send("Request Sent, wait for admin approval.")
      })
      .catch(err => res.status(500).send(err))
  },
  getAllRooms: (req, res) => {
    const db = req.app.get("db")
    db.room
      .get_rooms()
      .then(results => res.status(200).send(results))
      .catch(err => res.status(500).send(err))
  },
  getUserRooms: (req, res) => {
    const db = req.app.get("db")
    const user_id = req.session.user.id
    db.room
      .get_user_rooms(user_id)
      .then(results => res.status(200).send(results))
      .catch(err => res.status(500).send(err))
  },
  getNotUserRooms: async (req, res) => {
    try {
      const db = req.app.get("db")
      const user_id = req.session.user.id
      const allRooms = await db.room.get_rooms()
      const myRooms = await db.room.get_user_rooms(user_id)
      const notMyRooms = allRooms.filter(room => {
        let included = false
        for (let i = 0; i < myRooms.length; i++) {
          if (myRooms[i].chatroom_id === room.id) {
            included = true
          }
        }
        if (!included) {
          return room
        }
      })
      res.status(200).send(notMyRooms)
    } catch (err) {
      res.status(500).send(err)
    }
  },
}

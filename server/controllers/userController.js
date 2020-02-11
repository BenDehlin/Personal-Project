module.exports = {
  getUsers: async (req, res) => {
    console.log('hit')
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

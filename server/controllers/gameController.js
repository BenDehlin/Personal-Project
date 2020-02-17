module.exports = {
  getAllGames: (req, res) => {
    const db = req.app.get('db')
    db.game.get_all_games()
    .then(results => res.status(200).send(results))
    .catch(err => res.status(500).send(err))
  }
}
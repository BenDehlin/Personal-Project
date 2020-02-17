module.exports = {
  setScore: async (req, res) => {
    try{
      const db = req.app.get('db')
      const {id} = req.session.user
      const {score, time} = req.body
      await db.minesweeper.set_score([id, score, time])
      const results = await db.minesweeper.get_high_score(id)
      res.status(200).send(results[0])
    }
    catch (err) {
      res.status(500).send(err)
    }
  },
  getHighScore: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.session.user
    db.minesweeper.get_high_score(id)
    .then(results => res.status(200).send(results[0]))
    .catch(err => res.status(500).send(err))
  },
  getAllHighScores: (req, res) => {
    const db = req.app.get('db')
    db.minesweeper.get_all_high_scores()
    .then(results => res.status(200).send(results))
    .catch(err => res.status(500).send(err))
  }
}
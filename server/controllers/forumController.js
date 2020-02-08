module.exports = {
  getForums: (req, res) => {
    const db = req.app.get('db')
    db.forum.get_forums()
    .then(results => res.status(200).send(results))
  },
  createForum: (req, res) => {
    const db = req.app.get('db')
    const {forum_name} = req.body
    db.forum.create_forum(forum_name)
    .then(results => res.status(200).send(results))
    .catch(err => res.status(500).send(err))
  },
  getPosts: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    db.post.get_posts_for_forum(id)
    .then(results => res.status(200).send(results))
    .catch(err => res.status(500).send(err))
  }
}
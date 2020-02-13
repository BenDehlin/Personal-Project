module.exports = {
  getPost: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    db.post.get_post(id)
    .then(results => {
      res.status(200).send(results)})
    .catch(err => res.status(500).send(err))
  },
  getPosts: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    db.post.get_posts_for_forum(id)
    .then(results => res.status(200).send(results))
    .catch(err => res.status(500).send(err))
  },
  createPost: (req, res) => {
    const db = req.app.get('db')
    const {user_id, forum_id, post_title, post_content, post_img} = req.body
    db.post.create_post([user_id, forum_id, post_title, post_content, post_img])
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err))

  },
  editPost: async (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    const {post_title, post_content, post_img} = req.body
    const user_id = req.session.user.id
    const post = await db.get_post(id)
    if(user_id !== post.user_id){
      res.status(500).send('User is not author')
    }
    db.post.edit_post([id, post_title, post_content, post_img])
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err))
  },
  deletePost: async (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    db.post.delete_post(id)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err))
  }
}
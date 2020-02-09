require("dotenv").config()
const express = require("express")
const session = require("express-session")
const massive = require("massive")
const nodemailer = require('nodemailer')
const app = express()
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING, SERVER_EMAIL, SERVER_PASSWORD } = process.env

//CONTROLLERS
const authCtrl = require("./controllers/authController")
const chatCtrl = require("./controllers/chatController")
const forumCtrl = require('./controllers/forumController')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SERVER_EMAIL,
    pass: SERVER_PASSWORD
  }
})

app.use(express.json())
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 }
  })
)

massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log('Database connected')
  app.set('transporter', transporter)
  const io = require('socket.io')(
    app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`))
  )
  io.on('connection', (socket) => {
    const db = app.get('db')
    socket.on('sendMessage', (body, callback) => chatCtrl.sendMessage(db, io, socket, body, callback))
    socket.on('join', (body, callback) => chatCtrl.join(db, io, socket, body, callback))
    // socket.on('disconnect', () => chatCtrl.disconnect(db, io, socket))
  })
})

//ENDPOINTS
//auth endpoints
app.post("/auth/register", authCtrl.register)
app.post("/auth/login", authCtrl.login)
app.post("/auth/logout", authCtrl.logout)
app.get("/auth/user", authCtrl.getUser)

//chatroom endpoints
  //get user's chatrooms

//forum endpoint
app.get('/api/forums', forumCtrl.getForums)
app.post('/api/forums', forumCtrl.createForum)
app.get('/api/forums/:id', forumCtrl.getPosts)
  //get forum
  //get posts
  //get post

  //create post
  //edit post
  //delete post
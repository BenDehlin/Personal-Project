require("dotenv").config()
const express = require("express")
const session = require("express-session")
const massive = require("massive")
const nodemailer = require("nodemailer")
const app = express()
const {
  SERVER_PORT,
  SESSION_SECRET,
  CONNECTION_STRING,
  SERVER_EMAIL,
  SERVER_PASSWORD
} = process.env

//CONTROLLERS
const authCtrl = require("./controllers/authController")
const chatCtrl = require("./controllers/chatController")
const forumCtrl = require("./controllers/forumController")
const postCtrl = require("./controllers/postController")
const roomCtrl = require('./controllers/roomController')

const transporter = nodemailer.createTransport({
  service: "gmail",
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
  app.set("db", db)
  console.log("Database connected")
  app.set("transporter", transporter)
  const io = require("socket.io")(
    app.listen(SERVER_PORT, () =>
      console.log(`Server listening on ${SERVER_PORT}`)
    )
  )
  io.on("connection", socket => {
    const db = app.get("db")
    socket.on("sendMessage", (body, callback) =>
      chatCtrl.sendMessage(db, io, socket, body, callback)
    )
    socket.on("join", (body, callback) =>
      chatCtrl.join(db, io, socket, body, callback)
    )
    socket.on('disconnect', () => chatCtrl.disconnect(db, io, socket))
  })
})

//ENDPOINTS
//auth endpoints
app.post("/auth/register", authCtrl.register)
app.post("/auth/login", authCtrl.login)
app.post("/auth/logout", authCtrl.logout)
app.get("/auth/user", authCtrl.getUser)

//forum endpoint
app.get("/api/forums", forumCtrl.getForums)
app.post("/api/forums", forumCtrl.createForum)

//post endpoints
app.get("/api/forums/:id", postCtrl.getPosts)
app.get('/api/posts/:id', postCtrl.getPost)
app.post("/api/posts", postCtrl.createPost)
app.put("/api/posts/:id", postCtrl.editPost)
app.delete("/api/posts/:id", postCtrl.deletePost)

//get user's chatrooms
//chatroom endpoints
app.get('/api/rooms', roomCtrl.getAllRooms)
app.get('/api/rooms/user', roomCtrl.getUserRooms)
app.post('/api/rooms', roomCtrl.createRoom)
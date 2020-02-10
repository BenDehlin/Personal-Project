import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { getUser } from "../../redux/authReducer"
import io from "socket.io-client"
import TextField from "@material-ui/core/TextField"
import {createUseStyles} from 'react-jss'
import Button from "@material-ui/core/Button"
import { page } from "../../global-styles/global-styles"

const useStyles = createUseStyles({
  chat: {
    ...page,
    width: '80%',
    minHeight: '80vh',
    justifyContent: 'space-between',
  },
  chatMessages: {},
  chatInput: {
    margin: 5,
    borderRadius: 10,
    width: '100%',
    height: '5vh',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  chatInputField: {
    width: '60%'
  }
})

const Chat = ({ user, match }) => {
  const {chat, chatMessages, chatInput, chatInputField} = useStyles()
  let [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")
  const ENDPOINT = "http://localhost:3333"
  const socket = io.connect(ENDPOINT)

  useEffect(() => {
    if (user && match.params.room && user.username) {
      socket.emit("join", { username: user.username, room: match.params.room })
    }
    socket.on("message", message => {
      setMessages((messages = [...messages, message]))
    })
    return () => {
      socket.emit("disconnect")
      // socket.off()
      socket.disconnect()
    }
  }, [])

  const sendMessage = e => {
    e.preventDefault()
    socket.emit(
      "sendMessage",
      {
        username: user.username,
        message,
        room: match.params.room,
        id: user.id
      },
      () => {
        setMessage("")
      }
    )
  }
  return (
    <div className={chat}>
      <div className={chatMessages}>
        <h1>Chat</h1>
        {messages.map((element, index) => {
            return (
              <h2 key={index}>
                {element.username}: {element.message}
              </h2>
            )
          })}
      </div>
      <div className={chatInput}>
        <TextField
          className={chatInputField}
          value={message}
          placeholder="send message"
          onChange={e => setMessage(e.target.value)}
          onKeyPress={e => (e.key === "Enter" ? sendMessage(e) : null)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={e => sendMessage(e)}
        >
          Send Message
        </Button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  const { user } = state.authReducer
  return { user }
}

const mapDispatchToProps = {
  getUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)

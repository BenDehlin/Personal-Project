import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
import { getUser } from "../../redux/authReducer"
import io from "socket.io-client"
import TextField from "@material-ui/core/TextField"
import { createUseStyles } from "react-jss"
import Button from "@material-ui/core/Button"
import { page } from "../../global-styles/global-styles"
import ScrollToBottom from "react-scroll-to-bottom"
import axios from "axios"
import { toast } from "react-toastify"

const useStyles = createUseStyles({
  chat: {
    ...page,
    width: "80%",
    minHeight: "80vh",
    justifyContent: "space-between"
  },
  chatMessages: {
    maxHeight: "75vh",
    overflow: "scroll",
    width: "100%"
  },
  chatInput: {
    margin: 5,
    borderRadius: 10,
    width: "100%",
    height: "5vh",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  chatInputField: {
    width: "60%"
  }
})

const Chat = ({ user, match, history }) => {
  const { chat, chatMessages, chatInput, chatInputField } = useStyles()
  // let [messages, setMessages] = useState([])
  const messages = useRef([])
  // let [connected, setConnected] = useState(false)
  const connected = useRef(false)
  const [message, setMessage] = useState("")
  const ENDPOINT = "http://localhost:3333"
  const socket = io.connect(ENDPOINT)

  useEffect(() => {
    if (user && match.params.room && user.user_id) {
      axios.get("/api/rooms/user").then(async (results) => {
        await checkRooms(results)
        if (!connected.current) {
          console.log('hit')
          console.log(connected.current)
          history.push("/dashboard")
        }
      })
    }
    return () => {
      socket.emit("disconnect")
      // socket.off()
      socket.disconnect()
      connected.current = false
      // setConnected(connected = false)
    }
  }, [match.params])

  const checkRooms = (res) => {
    res.data.forEach(room => {
      console.log(room)
      console.log(match.params.id)
      if (+room.chatroom_id === +match.params.room) {
        socket.emit("join", {
          username: user.username,
          room: match.params.room
        })
        connected.current = true
        // setConnected(connected = true)
        socket.on("message", message => {
          messages.current = [...messages.current, message]
          // setMessages((messages = [...messages, message]))
        })
      }
    })
  }

  const sendMessage = e => {
    e.preventDefault()
    if (connected) {
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
    } else {
      toast.error("You are not allowed to chat in this room")
    }
  }
  return (
    <div className={chat}>
      {/* <ScrollToBottom className={chatMessages}> */}
      <div className={chatMessages}>
        <h1>Chat</h1>
        {messages &&
          messages.current.map((element, index) => {
            return (
              <h2 key={index}>
                {element.username}: {element.message}
              </h2>
            )
          })}
      </div>
      {/* </ScrollToBottom> */}
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

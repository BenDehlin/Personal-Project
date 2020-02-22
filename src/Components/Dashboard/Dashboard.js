import React from "react"
import { connect } from "react-redux"
import { getUser } from "../../redux/authReducer"
import Button from "@material-ui/core/Button"
import { createUseStyles } from "react-jss"
import useAxios from "../../hooks/useAxios"
import { page } from "../../global-styles/global-styles"
import axios from "axios"
import { toast } from "react-toastify"

const useStyles = createUseStyles({
  dashboardContainer: {
    paddingBottom: 20
  },
  dashboard: {
    ...page,
    flexFlow: "row",
    alignItems: "flex-start",
    minHeight: "80vh"
  },
  side: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexFlow: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  roomSection: {
    border: "1px solid black",
    "&:hover": {
      backgroundColor: "white",
      color: "black"
    },
    width: "80%",
    margin: 10,
    padding: 10,
    backgroundColor: "black",
    color: "white",
    borderRadius: 10
  },
  '@media (max-width: 850px)': {
    dashboard: {
      flexFlow: 'column'
    }
  }
})

const Dashboard = ({ user, history }) => {
  const { dashboard, side, roomSection, dashboardContainer } = useStyles()
  const [forums] = useAxios("/api/forums")
  const [otherRooms] = useAxios("/api/rooms/other")
  const [rooms] = useAxios("/api/rooms/user")
  const [games] = useAxios("/api/games/all")

  const requestAccess = chatroom_id => {
    axios
      .post(`/api/rooms/join/${chatroom_id}`)
      .then(results => toast.success(results.data))
      .catch(err => console.log(err))
  }
  return (
    <div className={dashboardContainer}>
      <div className={dashboard}>
        {user && (
          <>
            <div className={side}>
              <h1>Rooms: </h1>
              {rooms &&
                rooms.map(room => (
                  <div className={roomSection} key={room.chatroom_id}>
                    <p>{room.chatroom_name}</p>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => history.push(`/chat/${room.chatroom_id}`)}
                    >
                      Join
                    </Button>
                  </div>
                ))}
              {otherRooms &&
                otherRooms.map(room => (
                  <div className={roomSection} key={room.id}>
                    <p>{room.chatroom_name}</p>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        requestAccess(room.id)
                      }}
                    >
                      Request Access
                    </Button>
                  </div>
                ))}
            </div>
            <div className={side}>
              <h1>Forums:</h1>
              {forums &&
                forums.map(forum => (
                  <div className={roomSection} key={forum.id}>
                    <p>{forum.forum_name}</p>
                    <Button
                      key={forum.id}
                      variant="contained"
                      color="primary"
                      onClick={() => history.push(`/forum/${forum.id}`)}
                    >
                      View
                    </Button>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
      {user && (
        <div className={dashboard}>
          <div className={side}>
            <h1>Games:</h1>
            {games &&
              games.map(game => {
                const game_name = game.game_name.split(" ").join("/")
                return (
                  <div
                    className={roomSection}
                    key={game.id}
                    onClick={() => history.push(`/games/${game_name}`)}
                  >
                    <h1>{game.game_name}</h1>
                  </div>
                )
              })}
          </div>
          <div className={side}>
            <h1>High Scores:</h1>
            <div
              className={roomSection}
              onClick={() => history.push(`/games/highscores/minesweeper`)}
            >
              <h1>Minesweeper</h1>
            </div>
            <h1>Charts:</h1>
            <div
              className={roomSection}
              onClick={() =>
                history.push(`/games/highscores/charts/minesweeper`)
              }
            >
              <h1>Minesweeper</h1>
            </div>

            {/* <h1>High Scores:</h1>
            {games &&
              games.map(game => {
                const game_name = game.game_name.split(" ").join("/")
                return (
                  <div
                    className={roomSection}
                    key={game.id}
                    onClick={() =>
                      history.push(`/games/highscores/${game_name}`)
                    }
                  >
                    <h1>{game.game_name}</h1>
                  </div>
                )
              })}
            {games &&
              games.map(game => (
                <div
                  className={roomSection}
                  key={game.id}
                  onClick={() =>
                    history.push(`/games/highscores/charts/${game.game_name}`)
                  }
                >
                  <h1>Charts: {game.game_name}</h1>
                </div>
              ))} */}
          </div>
        </div>
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

import React from "react"
import { createUseStyles } from "react-jss"
import Button from "@material-ui/core/Button"
import { withRouter } from "react-router-dom"
import { variables } from "../../global-styles/global-styles"

const { primary, secondary } = variables
const useStyles = createUseStyles({
  smallUser: {
    backgroundColor: primary,
    border: `1px solid ${primary}`,
    color: "white",
    borderRadius: 10,
    width: "80%",
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
    "&:hover": {
      backgroundColor: secondary,
      color: primary
    }
  },
  smallUserSection: {
    width: "100%",
    display: "flex",
    flexFlow: "row",
    justifyContent: "space-around",
    padding: 10
  },
  "@media (max-width: 1050px)": {
    smallUserSection: {
      flexFlow: "column",
      alignItems: "center"
    }
  }
})

const SmallUser = ({ user, history }) => {
  const { smallUser, smallUserSection } = useStyles()
  const { id, username, first, last, img, age, email } = user
  return (
    <div className={smallUser}>
      <div className={smallUserSection}>
        <h2>User: {username}</h2>
        <h2>
          Name: {first} {last}
        </h2>
      </div>
      <div className={smallUserSection}>
        <h2>Email:</h2>
        <h3>{email}</h3>
      </div>
        <h2>Age: {age}</h2>
      <div className={smallUserSection}>
        <div>
          <img
            src={img || "https://via.placeholder.com/150"}
            style={{ maxHeight: 250, maxWidth: 250 }}
          />
        </div>
      </div>
      <div className={smallUserSection}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(`/admin/user/${id}`)}
        >
          View User
        </Button>
      </div>
    </div>
  )
}

export default withRouter(SmallUser)

import React from "react"
import { createUseStyles } from "react-jss"
import { page } from "../../global-styles/global-styles"
import Button from "@material-ui/core/Button"
import { withRouter } from "react-router-dom"

const useStyles = createUseStyles({
  adminSidebar: {
    ...page,
    width: "25vw",
    height: "80vh",
    position: 'fixed',
    left: 30,
    display: "flex",
    flexFlow: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  adminSidebarPlaceholder: {
    width: "25vw",
    height: "80vh"
  },
  heading: {
    fontSize: 50
  },
  "@media (max-width: 1050px)": {
    heading: {
      fontSize: 20
    }
  },
  "@media (max-width: 850px)": {},
})

const AdminSidebar = ({ history }) => {
  const { adminSidebar, adminSidebarPlaceholder, heading } = useStyles()
  return (
    <>
      <div className={adminSidebarPlaceholder}></div>
      <div className={adminSidebar}>
          <p className={heading}>Users</p>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/admin/users")}
          >
            View Users
          </Button>
          <p className={heading}>Chatrooms</p>
          <Button variant="contained" color="primary">
            View Rooms
          </Button>
      </div>
    </>
  )
}

export default withRouter(AdminSidebar)

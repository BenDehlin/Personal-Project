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
    adminSidebar: {
      width: "20vw",
    },
    adminSidebarPlaceholder: {
      width: "20vw",
    },
    heading: {
      fontSize: 20
    }
  }
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
            View
          </Button>
          <p className={heading}>Rooms</p>
          <Button variant="contained" color="primary">
            View
          </Button>
      </div>
    </>
  )
}

export default withRouter(AdminSidebar)

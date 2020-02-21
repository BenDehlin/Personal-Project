import React from "react"
import { createUseStyles } from "react-jss"
import { variables } from "../../global-styles/global-styles"
import Button from "@material-ui/core/Button"
import { withRouter } from "react-router-dom"

const useStyles = createUseStyles({
  adminSidebar: {
    borderRadius: 10,
    marginTop: "5vh",
    boxShadow: `.6em .6em .6em ${variables.blue}`,

    width: "25vw",
    height: "80vh",
    position: "fixed",
    left: 30,
    display: "flex",
    flexFlow: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "black",
    color: "white"
  },
  adminSidebarPlaceholder: {
    width: "25vw",
    height: "80vh"
  },
  adminSidebarSection: {
    width: "80%",
    backgroundColor: "white",
    border: "1px solid white",
    color: "black",
    marginTop: 20,
    paddingBottom: 10,
    borderRadius: 10,
    "&:hover": {
      backgroundColor: "black",
      color: "white"
    }
  },
  heading: {
    fontSize: 50
  },
  "@media (max-width: 1050px)": {
    adminSidebar: {
      width: "20vw",
      maxHeight: "40vh",
      top: "30vh"
    },
    adminSidebarPlaceholder: {
      width: "20vw",
      maxHeight: 100
    },
    heading: {
      fontSize: 20
    }
  }
})

const AdminSidebar = ({ history, location }) => {
  const {
    adminSidebar,
    adminSidebarPlaceholder,
    adminSidebarSection,
    heading
  } = useStyles()
  return (
    <>
      <div
        className={adminSidebarPlaceholder}
      ></div>
      <div className={adminSidebar}>
        <div className={adminSidebarSection}>
          <p className={heading}>Users</p>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/admin/users")}
          >
            View
          </Button>
        </div>
        <div className={adminSidebarSection}>
          <p className={heading}>Rooms</p>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/admin/rooms")}
          >
            View
          </Button>
        </div>
      </div>
    </>
  )
}

export default withRouter(AdminSidebar)

import React, { useState } from "react";
import Navigator from "./Navigator.js";
import Header from "./Header.js";
import Video from "../Video.js";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Overview from "../Overview.js";
import Settings from "../Settings.js";
import Inbox from "../Inbox.js";
import Notifications from "../Notifications.js";
import LiveStream from "../LiveStream.js";

const drawerWidth = 256;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  app: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: "#eaeff1",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [menuItem, setMenuItem] = useState("overview");

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer}>
        <Navigator
          PaperProps={{ style: { width: drawerWidth } }}
          setMenuItem={setMenuItem}
        />
      </nav>
      <div className={classes.app}>
        <Header />
        <div className={classes.main}>
          {menuItem === "overview" ? (
            <Overview />
          ) : menuItem === "live" ? (
            <LiveStream />
          ) : menuItem === "inbox" ? (
            <Inbox />
          ) : menuItem === "notifications" ? (
            <Notifications />
          ) : menuItem === "videos" ? (
            <Video />
          ) : menuItem === "settings" ? (
            <Settings />
          ) : (
            "Error"
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

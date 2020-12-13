import React, { useState, useEffect } from "react";
import Navigator from "./Navigator.js";
import Header from "./Header.js";
import Video from "./Video.js";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Overview from "./Overview.js";
import Settings from "./Settings.js";
import Inbox from "./Inbox.js";
import Notifications from "./Notifications.js";
import Explore from "./Explore.js";
import LiveStream from "./LiveStream.js";
import ViewStream from "./ViewStream.js";
import { connect, useDispatch } from "react-redux";
import { getAccount, reserveRoom } from "../../actions/index.js";
import { useParams } from "react-router-dom";

const drawerWidth = 256;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
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

const Dashboard = (props) => {
  console.log("dashboard", props);
  const classes = useStyles();
  //const username = useParams();
  const { username, first_name, last_name, email, id, roomId } = props;
  const dispatch = useDispatch();
  const [menuItem, setMenuItem] = useState("overview");
  // const [roomId, setRoomId] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getAccount(username));
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    dispatch(reserveRoom());
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer}>
        <Navigator
          PaperProps={{ style: { width: drawerWidth } }}
          setMenuItem={setMenuItem}
          roomId={roomId}
        />
      </nav>
      <div className={classes.app}>
        <Header />
        <div className={classes.main}>
          {menuItem === "overview" ? (
            <Overview />
          ) : menuItem === "live" ? (
            <LiveStream roomId={roomId} />
          ) : menuItem === "explore" ? (
            <Explore setMenuItem={setMenuItem} />
          ) : menuItem === "viewstream" ? (
            <ViewStream viewer={username} />
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

const mapStateToProps = (state) => {
  return {
    username: state.User.username,
    userId: state.User.user_id,
    first_name: state.User.first_name,
    last_name: state.User.last_name,
    email: state.User.email,
    isAuthenticated: state.User.isAuthenticated,
    roomId: state.Stream.reservedRoom,
  };
};

export default connect(mapStateToProps, { getAccount })(Dashboard);

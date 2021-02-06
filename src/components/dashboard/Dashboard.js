import React, { useState, useEffect, createContext } from "react";
import { PeerContext } from "../../contexts/index.js";
import Navigator from "./Navigator.js";
import Header from "./Header.js";
import Video from "./Video.js";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container } from "@material-ui/core";
import Overview from "./Overview.js";
import Settings from "./Settings.js";
import Inbox from "./Inbox.js";
import Notifications from "./Notifications.js";
import Explore from "./Explore.js";
import { MemoizedLiveStream } from "./LiveStream.js";
import LiveStream from "./LiveStream.js";
import { MemoizedViewStream } from "./ViewStream.js";
import ViewStream from "./ViewStream.js";
import { connect, useDispatch } from "react-redux";
import { getAccount, reserveRoom, updatePeerId } from "../../actions/index.js";
import { useParams } from "react-router-dom";

let myPeer;

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
  const classes = useStyles();
  const { username, first_name, last_name, email, id, roomId, peerId } = props;
  const dispatch = useDispatch();
  const [menuItem, setMenuItem] = useState("overview");

  useEffect(() => {
    myPeer = new Peer();
    const timer = setTimeout(() => {
      dispatch(updatePeerId(myPeer.id));
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Add dispatch in for updatePeerId

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getAccount(username));
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <PeerContext.Provider value={myPeer}>
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              setMenuItem={setMenuItem}
              roomId={roomId}
            />
          </PeerContext.Provider>
        </nav>
        <div className={classes.app}>
          <Header />
          <div className={classes.main}>
            {menuItem === "overview" ? (
              <Overview />
            ) : menuItem === "live" ? (
              <PeerContext.Provider value={myPeer}>
                <MemoizedLiveStream roomId={roomId} />
              </PeerContext.Provider>
            ) : menuItem === "explore" ? (
              <Explore setMenuItem={setMenuItem} />
            ) : menuItem === "viewstream" ? (
              <PeerContext.Provider value={myPeer}>
                <MemoizedViewStream viewer={username} />
              </PeerContext.Provider>
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
    </>
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
    //peerId: state.User.peer.id,
  };
};

export default connect(mapStateToProps, { getAccount })(Dashboard);

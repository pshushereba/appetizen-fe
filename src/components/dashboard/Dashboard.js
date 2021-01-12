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
import { MemoizedLiveStream } from "./LiveStream.js";
import LiveStream from "./LiveStream.js";
import ViewStream from "./ViewStream.js";
import { connect, useDispatch } from "react-redux";
import { getAccount, reserveRoom, updatePeerId } from "../../actions/index.js";
import { useParams } from "react-router-dom";
import {
  initiateChatSocket,
  initiateVideoSocket,
} from "../../utils/socketHelpers.js";

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
  //const username = useParams();
  const { username, first_name, last_name, email, id, roomId, peerId } = props;
  const dispatch = useDispatch();
  const [menuItem, setMenuItem] = useState("overview");
  const [videoSocket, setVideoSocket] = useState({});
  const [chatSocket, setChatSocket] = useState({});
  // const [roomId, setRoomId] = useState("");
  // let videoSocket;
  // let chatSocket;
  console.log("dashboard roomId from props", roomId);

  // useEffect(() => {
  //   dispatch(reserveRoom());
  // }, []);

  // myPeer = new Peer();
  // dispatch(updatePeerId(myPeer.id));

  useEffect(() => {
    setVideoSocket(initiateVideoSocket(roomId, username, peerId));
    setChatSocket(initiateChatSocket(roomId, username));
  }, []);

  console.log(videoSocket);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getAccount(username));
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer}>
        <Navigator
          PaperProps={{ style: { width: drawerWidth } }}
          setMenuItem={setMenuItem}
          roomId={roomId}
          //peer={myPeer}
        />
      </nav>
      <div className={classes.app}>
        <Header />
        <div className={classes.main}>
          {menuItem === "overview" ? (
            <Overview />
          ) : menuItem === "live" ? (
            <MemoizedLiveStream
              roomId={roomId}
              //peer={myPeer}
              videoSocket={videoSocket}
              chatSocket={chatSocket}
            />
          ) : menuItem === "explore" ? (
            <Explore setMenuItem={setMenuItem} />
          ) : menuItem === "viewstream" ? (
            <ViewStream
              viewer={username}
              //peer={myPeer}
              videoSocket={videoSocket}
              chatSocket={chatSocket}
            />
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
    peerId: state.User.peer.id,
  };
};

export default connect(mapStateToProps, { getAccount })(Dashboard);

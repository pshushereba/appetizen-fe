import React, { useState, useEffect, createContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navigator from "../components/dashboard/Navigator.js"
import Header from "../components/dashboard/Header.js"
import { connect, useDispatch } from "react-redux";
import { getAccount, reserveRoom, updatePeerId } from "../actions/index.js";
import { PeerContext } from "../contexts/index.js";

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
    }, 1000);

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
            {props.children}
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
  };
};

export default connect(mapStateToProps, { getAccount })(Dashboard);

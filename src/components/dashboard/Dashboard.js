import React from "react";
import Navigator from "./Navigator.js";
import Header from "./Header.js";
import Video from "../Video.js";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

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

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer}>
        <Navigator PaperProps={{ style: { width: drawerWidth } }} />
      </nav>
      <div className={classes.app}>
        <Header />
        <div className={classes.main}>{/* <Video /> */}</div>
      </div>
    </div>
  );
};

export default Dashboard;

import React from "react";
import Navigator from "./Navigator.js";
import Video from "../Video.js";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 256;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
      <h1>The private route worked.</h1>
      <nav className={classes.drawer}>
        <Navigator />
      </nav>

      <Video />
    </div>
  );
};

export default Dashboard;

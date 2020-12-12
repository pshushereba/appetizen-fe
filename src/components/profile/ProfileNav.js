import React from "react";
import { AppBar, Toolbar, Typography, Button, Grid } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useParams } from "react-router-dom";
import Search from "../Search.js";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
  title: {
    flexGrow: 1,
    color: "white",
    textDecoration: "none",
    marginRight: "2rem",
  },
  link: {
    textDecoration: "none",
    // color: theme.palette.common.white,
    margin: theme.spacing(2),
  },
  button: {
    color: theme.palette.common.black,
    margin: theme.spacing(2),
  },
}));

const ProfileNav = () => {
  const classes = useStyles();
  const { username } = useParams();

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" color="secondary">
          <Toolbar>
            <Typography className={classes.title} component={Link} to="/">
              Appetizen
            </Typography>
            <Search />
            <HomeIcon
              component={Link}
              color="primary"
              className={classes.link}
              to={`/${username}/dashboard`}
            />
            <Button
              variant="contained"
              className={classes.button}
              component={Link}
              to="/login"
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default ProfileNav;

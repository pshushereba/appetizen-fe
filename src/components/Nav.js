import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core/";
import theme from "./styles/Theme";

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
  },
  link: {
    textDecoration: "none",
    color: theme.palette.common.white,
    margin: theme.spacing(2),
  },
  button: {
    color: theme.palette.common.black,
    margin: theme.spacing(2),
  },
  root: {},
}));

const Nav = () => {
  const classes = useStyles();

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar>
            <Typography className={classes.title} component={Link} to="/">
              Appetizen
            </Typography>
            <Typography className={classes.link} component={Link} to="/about">
              About
            </Typography>
            <Typography className={classes.link} component={Link} to="/pricing">
              Pricing
            </Typography>
            <Button
              variant="contained"
              className={classes.button}
              component={Link}
              to="/login"
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default Nav;

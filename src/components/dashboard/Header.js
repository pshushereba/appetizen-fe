import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import HelpIcon from "@material-ui/icons/Help";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Menu } from "@material-ui/core";
import Search from "../Search.js";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../actions/index.js";
import NotificationDropdown from "../NotificationDropdown.js";

const lightColor = "rgba(255, 255, 255, 0.7)";

const useStyles = makeStyles((theme) => ({
  primaryBar: {
    backgroundColor: theme.palette.secondary.dark,
  },
  secondaryBar: {
    zIndex: 0,
    backgroundColor: theme.palette.secondary.dark,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: "none",
    color: lightColor,
    "&:hover": {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (e, value) => {
    setValue(value);
  };

  const handleLogout = (e) => {
    e.preventDefault;
    dispatch(logoutUser());
    history.push("/");
  };

  return (
    <>
      <AppBar className={classes.primaryBar} position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item>
              <NotificationDropdown />
            </Grid>
            <Grid item>
              <Button
                className={classes.button}
                onClick={handleLogout}
                variant="outlined"
                color="inherit"
                size="small"
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        //color="secondary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item sm>
              <Search />
            </Grid>
            <Grid item>
              <Button
                className={classes.button}
                variant="outlined"
                color="inherit"
                size="small"
              >
                Test
              </Button>
            </Grid>
            <Grid item>
              <Tooltip title="Help">
                <IconButton color="inherit">
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;

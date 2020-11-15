import React from "react";
import Nav from "./Nav.js";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Cssbaseline, { CssBaseline } from "@material-ui/core";
import { Grid, Typography, Button } from "@material-ui/core/";
import home_burger from "../assets/homepage_burger.svg";
import homepage_kitchen from "../assets/homepage_kitchen.svg";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    backgroundColor: "#e3e3e3",
    paddingTop: "2rem",
  },
  img: {
    marginTop: -theme.spacing(4),
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <>
      <Nav />
      <CssBaseline />
      <Grid container direction="column" className={classes.container}>
        <Grid item>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography variant="h2" align="center">
                Show them how
                <br /> it's done
              </Typography>
              <Typography variant="subtitle1" align="center">
                With Appetizen, you're the star of the show.
              </Typography>
              <div className={classes.btnContainer}>
                <Button component={Link} to="/signup" variant="contained">
                  Get Started
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img
                src={homepage_kitchen}
                alt="testing"
                className={classes.img}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container justify="space-around">
            <Grid item>
              <Typography>Test 1</Typography>
            </Grid>
            <Grid item>
              <Typography>Test 2</Typography>
            </Grid>
            <Grid item>
              <Typography>Test 3</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;

import React from "react";
import Nav from "./Nav.js";
import { makeStyles } from "@material-ui/core/styles";
import Cssbaseline, { CssBaseline } from "@material-ui/core";
import { Grid, Typography } from "@material-ui/core/";
import home_burger from "../assets/homepage_burger.svg";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "#e3e3e3",
    paddingTop: "2rem",
  },
  img: {
    height: "308px",
    width: "460px",
    borderRadius: "10px",
    margin: theme.spacing(2),
  },
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <>
      <Nav />
      <CssBaseline />
      <Grid container className={classes.container}>
        <Grid item direction="column" sm={6}>
          <Typography variant="h2" align="center">
            Show them how
            <br /> it's done
          </Typography>
          <Typography variant="subtitle1" align="center">
            With Appetizen, you're the star of the show.
          </Typography>
        </Grid>
        <Grid item>
          <img src={home_burger} alt="testing" className={classes.img} />
        </Grid>
        <Grid item>
          <Grid container className={classes.container}>
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

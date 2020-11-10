import React from "react";
import Nav from "./Nav.js";
import { makeStyles } from "@material-ui/core/styles";
import Cssbaseline, { CssBaseline } from "@material-ui/core";
import { Grid, Typography } from "@material-ui/core/";
import hero_img from "../assets/home_hero.jpg";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    paddingTop: "2rem",
  },
  heroText: {
    color: theme.palette.common.white,
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
          <Typography variant="h2" align="center" className={classes.heroText}>
            Show them how
            <br /> it's done
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            className={classes.heroText}
          >
            With Appetizen, you're the star of the show.
          </Typography>
        </Grid>
        <Grid item>
          <img src={hero_img} alt="testing" className={classes.img} />
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;

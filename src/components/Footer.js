import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer>
      <Grid container justify="center">
        <Grid item>
          <Grid container direction="column" spacing={2}>
            <Grid item component={Link} to="/">
              Home
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" spacing={2}>
            <Grid item component={Link} to="/about">
              About
            </Grid>
            <Grid item component={Link} to="/signup">
              Sign Up
            </Grid>
            <Grid item>Contact Us</Grid>
            <Grid item>Services</Grid>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;

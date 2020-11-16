import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  footerContainer: {
    backgroundColor: theme.palette.primary.main,
  },
  links: {
    color: theme.palette.common.white,
    textDecoration: "none",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer>
      <Grid
        container
        justify="center"
        className={classes.footerContainer}
        spacing={2}
      >
        <Grid item>
          <Grid container direction="column" spacing={4}>
            <Grid item component={Link} to="/" className={classes.links}>
              Home
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" spacing={2}>
            <Grid item component={Link} to="/about" className={classes.links}>
              About
            </Grid>
            <Grid item component={Link} to="/signup" className={classes.links}>
              Sign Up
            </Grid>
            <Grid item className={classes.links}>
              Contact Us
            </Grid>
            <Grid item className={classes.links}>
              Pricing
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;

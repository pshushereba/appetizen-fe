import React from "react";
import Nav from "../Nav.js";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { Grid, Typography, Button, Paper } from "@material-ui/core/";
import homepage_kitchen from "../../assets/homepage_kitchen.svg";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import PeopleIcon from "@material-ui/icons/People";
import ShareIcon from "@material-ui/icons/Share";
import NewsletterSection from "../NewsletterSection.js";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    backgroundColor: "#e3e3e3",
    paddingTop: "2rem",
  },
  img: {
    marginTop: -theme.spacing(4),
  },
  textAlign: {
    marginTop: theme.spacing(4),
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  featuresSection: {
    height: "300px",
  },
  featureTypography: {
    paddingTop: "2rem",
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
            <Grid item xs={12} sm={6} className={classes.textAlign}>
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

        <Grid item className={classes.featuresSection}>
          <Grid container justify="space-around">
            <Grid item xs={8} sm={3}>
              <Grid container direction="column" alignItems="center">
                <VideoCallIcon fontSize="large" />
                <Typography
                  variant="h5"
                  align="center"
                  className={classes.featureTypography}
                >
                  Show off your skills by live streaming while you cook or bake.
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={8} sm={3}>
              <Grid container direction="column" alignItems="center">
                <PeopleIcon fontSize="large" />
                <Typography
                  variant="h5"
                  align="center"
                  className={classes.featureTypography}
                >
                  Engage with your subscribers while you stream and build your
                  following.
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={8} sm={3}>
              <Grid container direction="column" alignItems="center">
                <ShareIcon fontSize="large" />
                <Typography
                  variant="h5"
                  align="center"
                  className={classes.featureTypography}
                >
                  Share recipes and nutrition info for all the meals you make!
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <NewsletterSection
            bgColor="default"
            size="medium"
            bgImage=""
            bgImageOpacity={1}
            title="Stay in the know"
            subtitle="Receive our latest articles and feature updates"
            buttonText="Subscribe"
            buttonColor="primary"
            inputPlaceholder="Enter your email"
            subscribedMessage="You are now subscribed!"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;

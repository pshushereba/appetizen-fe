import React from "react";
import Nav from "../components/Nav.js";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(6),
    textAlign: "center",
    background: "transparent",
  },
}));

const NotFound = () => {
  const classes = useStyles();
  return (
    <>
      <Nav />
      <div className={classes.container}>
        <Typography component="h1" variant="h1" align="center" gutterBottom>
          404
        </Typography>
        <Typography component="h2" variant="h5" align="center" gutterBottom>
          Page not found.
        </Typography>
        <Typography component="h2" variant="body1" align="center" gutterBottom>
          The page you are looking for might have been removed.
        </Typography>

        <Button component={Link} to="/" variant="contained" color="secondary">
          Return to website
        </Button>
      </div>
    </>
  );
};

export default NotFound;

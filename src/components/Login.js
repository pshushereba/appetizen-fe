import React from "react";
import LoginForm from "./LoginForm.js";
import Nav from "./Nav.js";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import login_main from "../assets/login_main.svg";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: "#E3E3E3",
    height: "90vh",
  },
  formContainer: {
    width: "40%",
  },
}));

const Login = () => {
  const classes = useStyles();

  return (
    <>
      <Nav />
      <Grid
        container
        justify="space-around"
        alignItems="center"
        className={classes.mainContainer}
      >
        <Grid item className={classes.formContainer}>
          <Typography variant="h3" gutterBottom="true" align="center">
            Welcome Back
          </Typography>
          <LoginForm />
        </Grid>
        <Grid item>
          <img src={login_main} alt="authentication" />
        </Grid>
      </Grid>
    </>
  );
};

export default Login;

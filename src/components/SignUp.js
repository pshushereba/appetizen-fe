import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../utils/axiosAuth.js";
import { Box, Button, TextField, Grid, Typography } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Nav from "./Nav.js";
import signup_main from "../assets/signup_main.svg";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: "90vh",
    backgroundColor: "#E3E3E3",
  },
}));

const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const history = useHistory();
  const classes = useStyles();

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosWithAuth()
      .post("/auth/register", user)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        console.log(res);
        history.push(`${user.username}/dashboard`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Nav />
      <CssBaseline />
      <Grid
        container
        className={classes.mainContainer}
        justify="space-around"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h4" gutterBottom="true">
            Let's Get Started
          </Typography>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            width={400}
            justifyContent="center"
            onSubmit={handleSubmit}
          >
            <TextField
              name="name"
              label="Name"
              value={user.name}
              onChange={handleChange}
            />
            <TextField
              name="email"
              label="Email"
              value={user.email}
              onChange={handleChange}
            />
            <TextField
              name="username"
              label="Username"
              value={user.username}
              onChange={handleChange}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              value={user.password}
              onChange={handleChange}
            />
            <Button type="submit">Sign Up</Button>
          </Box>
        </Grid>
        <Grid item>
          <img src={signup_main} alt="signup main" />
        </Grid>
      </Grid>
    </>
  );
};

export default SignUp;

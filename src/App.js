import React from "react";
import socketClient from "socket.io-client";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./components/styles/Theme.js";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.js";
import Footer from "./components/Footer.js";
import HomePage from "./components/HomePage.js";
import Dashboard from "./components/dashboard/Dashboard.js";

// https://cors-anywhere.herokuapp.com/

// const SERVER = "https://appetizen-media.herokuapp.com/";

function App() {
  // const socket = socketClient(SERVER);
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <PrivateRoute
          exact
          path={`/:username/dashboard`}
          component={Dashboard}
        />
      </Switch>
      <Footer />
    </ThemeProvider>
  );
}

export default App;

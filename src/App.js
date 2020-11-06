import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./components/styles/Theme.js";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.js";
import Nav from "./components/Nav.js";
import HomePage from "./components/HomePage.js";
import Dashboard from "./components/dashboard/Dashboard.js";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Nav />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <PrivateRoute
          exact
          path={`/:username/dashboard`}
          component={Dashboard}
        />
      </Switch>
    </ThemeProvider>
  );
}

export default App;

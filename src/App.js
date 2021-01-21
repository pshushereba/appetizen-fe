import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./components/styles/Theme.js";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.js";
import Footer from "./components/Footer.js";
import HomePage from "./components/pages/HomePage.js";
import Dashboard from "./components/dashboard/Dashboard.js";
import Login from "./components/pages/Login.js";
import About from "./components/pages/About.js";
import SignUp from "./components/pages/SignUp.js";
import Pricing from "./components/pages/Pricing.js";
import Profile from "./components/profile/Profile.js";
import FAQ from "./components/pages/FAQ.js";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/about" component={About} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/signup" component={SignUp} />
        <Route path="/faq" component={FAQ} />
        <PrivateRoute exact path={`/:username/profile`} component={Profile} />
        <PrivateRoute
          exact
          path={`/:username/dashboard`}
          component={Dashboard}
        />
        <PrivateRoute exact path={`/:username/explore`} component={Dashboard} />
        <PrivateRoute exact path={`/:username/inbox`} component={Dashboard} />
        <PrivateRoute
          exact
          path={`/:username/notifications`}
          component={Dashboard}
        />
        <PrivateRoute exact path={`/:username/videos`} component={Dashboard} />
        <PrivateRoute
          exact
          path={`/:username/analytics`}
          component={Dashboard}
        />
        <PrivateRoute
          exact
          path={`/:username/subscribers`}
          component={Dashboard}
        />
        <PrivateRoute
          exact
          path={`/:username/settings`}
          component={Dashboard}
        />
        <PrivateRoute exact path={`/:username/:id`} component={Dashboard} />

        <PrivateRoute exact path={`/streams/:room`} component={Dashboard} />
      </Switch>
      <Footer
        bgColor="light"
        size="normal"
        bgImage=""
        bgImageOpacity={1}
        description="Authentic cooking for all."
        copyright="© 2021 Appetizen"
        sticky={true}
      />
    </ThemeProvider>
  );
}

export default App;

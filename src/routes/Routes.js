import React from 'react'
import PrivateRoute from '../components/PrivateRoute';
import Dashboard from '../layouts/Dashboard';
import { dashboardRoutes } from './index';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Temporary import of components
import HomePage from "../components/pages/HomePage.js";
import Login from "../components/pages/Login.js";
import About from "../components/pages/About.js";
import SignUp from "../components/pages/SignUp.js";
import Pricing from "../components/pages/Pricing.js";
import FAQ from "../components/pages/FAQ.js";
import Contact from "../components/pages/Contact.js";

// const childRoutes = (Layout, routes) => {
//   routes.children.map((element, index) => {
//     const ElementComponent = element.component || React.Fragment;

//     return (
//       <PrivateRoute
//         key={index}
//         path={element.path}
//         render={(props) => (
//           <Layout>
//             <ElementComponent {...props} />
//           </Layout>
//         )}
//         // component={ElementComponent}
//         />
//     )
//   })
// }

const childRoutes = (Layout, routes) =>
  routes.children.map(({ component: Component, guard, children, path }, index) => {
    const Guard = guard || React.Fragment;

    return children ? (
      children.map((element, index) => {
        const Guard = element.guard || React.Fragment;
        const ElementComponent = element.component || React.Fragment;

        return (
          <Route
            key={index}
            path={element.path}
            exact
            render={(props) => (
              <Layout>
                <Guard>
                  <ElementComponent {...props} />
                </Guard>
              </Layout>
            )}
          />
        );
      })
    ) : Component ? (
      <Route
        key={index}
        path={path}
        exact
        render={(props) => (
          <Layout>
            <Guard>
              <Component {...props} />
            </Guard>
          </Layout>
        )}
      />
    ) : null;
  });

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/about" component={About} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/signup" component={SignUp} />
        <Route path="/faq" component={FAQ} />
        <Route path="/contact" component={Contact} />
        {childRoutes(Dashboard, dashboardRoutes)}
      </Switch>
    </Router>
  )
}

export default Routes;
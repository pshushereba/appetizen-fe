import React from "react";
import { Grid, Typography, Container } from "@material-ui/core/";
import { CssBaseline } from "@material-ui/core";
import ProfileNav from "./ProfileNav.js";
import Upload from "./Upload.js";
import ProfileUserCard from "./ProfileUserCard.js";
import ProfileHeader from "./ProfileHeader.js";
import ProfileContentNav from "./ProfileContentNav.js";
import ProfileAbout from "./ProfileAbout.js";
import { spacing } from "@material-ui/system";
import {
  useParams,
  useRouteMatch,
  withRouter,
  Link,
  Switch,
  Route,
} from "react-router-dom";

const Profile = () => {
  const { url, path, params } = useRouteMatch();
  console.log("params", params);
  const renderSwitch = (params) => {
    switch (params.slug) {
      case "about":
        return <ProfileAbout />;
      default:
        return null;
    }
  };

  return (
    <>
      <ProfileNav />
      <CssBaseline />
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={4} xl={3}>
            <ProfileUserCard />
          </Grid>
          <Grid item={true} xs={12} lg={8} xl={9}>
            <ProfileHeader />
            {/* <Grid container spacing={6}>
              <Grid item xs={12} lg={4}>
                <h2>Placeholder 1</h2>
              </Grid>
              <Grid item xs={12} lg={4}>
                <h2>Placeholder 2</h2>
              </Grid>
              <Grid item xs={12} lg={4}>
                <h2>Placeholder 3</h2>
              </Grid>
            </Grid> */}
            {/* <h2>Placeholder 4</h2> */}
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={4} xl={3}>
            <ProfileContentNav />
          </Grid>
          <Grid item={true} xs={12} lg={8} xl={9}>
            {(() => {
              switch (params.slug) {
                case "about":
                  return <ProfileAbout />;
                default:
                  return null;
              }
            })()}
            {/* <Switch>
              <Route path={`${path}/profile/about`}>
                <ProfileAbout />
                {console.log("params", params)}
              </Route>
            </Switch> */}
            {/* {params.slug && renderSwitch(params.slug)} */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export const ProfileWithRouter = withRouter(Profile);

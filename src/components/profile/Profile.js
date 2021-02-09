import React from "react";
import { Grid, Typography } from "@material-ui/core/";
import ProfileNav from "./ProfileNav.js";
import Upload from "./Upload.js";
import ProfileUserCard from "./ProfileUserCard.js";

const Profile = () => {
  return (
    <>
      <ProfileNav />
      <Grid container direction="column">
        <Grid item={true}>
          <ProfileUserCard />
        </Grid>
        <Grid item={true}>
          {/* <Upload /> */}
          <h1>Profile Header will go here</h1>
          <h2>This section will also have user information</h2>
        </Grid>
        <Grid item={true}>
          <h1>This section might hold the side nav</h1>
          <h2>Need to display photos, videos, recipes</h2>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;

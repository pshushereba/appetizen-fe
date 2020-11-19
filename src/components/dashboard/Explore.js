import React from "react";
import Grid from "@material-ui/core/Grid";
import io from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";

const Explore = () => {
  return (
    <>
      <Grid container spacing={10}>
        <Grid item sm={6}>
          <div id="viewer-video"></div>
        </Grid>
        <Grid item sm={3}>
          <Chat />
        </Grid>
      </Grid>
    </>
  );
};

export default Explore;

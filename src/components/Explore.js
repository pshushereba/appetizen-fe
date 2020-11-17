import React from "react";
import Grid from "@material-ui/core/Grid";
import io from "socket.io-client";

const Explore = () => {
  return (
    <>
      <Grid container spacing={10}>
        <Grid item sm={6}>
          <div id="subscriber-video"></div>
        </Grid>
        <Grid item sm={3}>
          <Chat />
        </Grid>
      </Grid>
    </>
  );
};

export default Explore;

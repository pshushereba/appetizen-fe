import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  tile: {
    backgroundColor: theme.palette.secondary.light,
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  tileText: {
    backgroundColor: "none",
    color: theme.palette.common.white,
  },
}));

const Overview = () => {
  const classes = useStyles();
  const [data, updateData] = useState(null);
  // const useEventSource = (url) => {
  //   const [data, updateData] = useState(null);

  //   useEffect(() => {
  //     const source = new EventSource(url);

  //     source.onmessage = function logEvents(event) {
  //       updateData(JSON.parse(event.data));
  //     };
  //   }, []);

  //   return data;
  // };
  // const data = useEventSource("http://localhost:4000/api/profiles/events");

  useEffect(() => {
    const source = new EventSource(
      `http://localhost:4000/api/profiles/events/1`
    );

    source.onmessage = function logEvents(event) {
      updateData(JSON.parse(event.data));
    };

    return () => {
      source.close();
    };
  }, []);

  //console.log(data);
  return (
    <>
      <Container maxWidth={false}>
        <Grid container direction="column">
          <Grid container spacing={10} justify="center">
            <Grid item xs={3} className={classes.tile}>
              <Paper>
                <Typography variant="subtitle1" align="center">
                  New Subscribers
                </Typography>
                <Typography variant="h4" align="center">
                  {data ? data.num : ""}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={3} className={classes.tile}>
              <Paper>
                <Typography variant="subtitle1" align="center">
                  New Views
                </Typography>
                <Typography variant="body2" align="center">
                  600
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={3} className={classes.tile}>
              <Paper>
                <Typography variant="subtitle1" align="center">
                  Engagement
                </Typography>
                <Typography variant="body2" align="center">
                  +135%
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Overview;

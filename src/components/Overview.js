import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  tile: {
    backgroundColor: theme.palette.primary.light,
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

  return (
    <>
      <Grid container direction="column">
        <Grid container spacing={10} justify="center">
          <Grid item xs={3} className={classes.tile}>
            <Paper>
              <Typography variant="subtitle1" align="center">
                New Subscribers
              </Typography>
              <Typography variant="body1" align="center">
                300
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
    </>
  );
};

export default Overview;

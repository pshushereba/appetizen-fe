import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import { green, red } from "@material-ui/core/colors";
import StatsTile from "../StatsTile.js";
import BarChart from "../BarChart.js";
import UserMap from "../UserMap.js";
import RevenueWidget from "../RevenueWidget.js";

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

const Overview = ({ userId }) => {
  const classes = useStyles();
  const [data, updateData] = useState(null);

  useEffect(() => {
    const source = new EventSource(
      `http://localhost:4000/api/users/events/${userId}`
    );

    source.onmessage = function logEvents(event) {
      updateData(JSON.parse(event.data));
    };

    return () => {
      source.close();
    };
  }, []);

  return (
    <>
      <Container maxWidth={false}>
        <Grid container direction="column">
          <Grid container spacing={6}>
            <Grid item xs={12} lg={5}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={12} md={6}>
                  <StatsTile
                    title="Subscribers"
                    amount={data ? data.subscribers.count : ""}
                    chip="Today"
                    percentageText="+14%"
                    percentagecolor={green[500]}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <StatsTile
                    title="Activity"
                    amount="63.20"
                    chip="Annual"
                    percentageText="-12%"
                    percentagecolor={red[500]}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <StatsTile
                    title="Real-Time"
                    amount="1.320"
                    chip="Monthly"
                    percentageText="-18%"
                    percentagecolor={red[500]}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <StatsTile
                    title="Bounce"
                    amount="12.36"
                    chip="Yearly"
                    percentageText="+27%"
                    percentagecolor={green[500]}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={7}>
              <BarChart />
            </Grid>
          </Grid>

          <Grid container spacing={6}>
            <Grid item xs={12} lg={8}>
              <UserMap />
            </Grid>
            <Grid item xs={12} lg={4}>
              <RevenueWidget />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.User.userId,
  };
};

export default connect(mapStateToProps, {})(Overview);

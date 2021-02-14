import React from "react";
import { Card, CardContent, CardHeader, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { VectorMap } from "react-jvectormap";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(6),
  },
  cardContent: {
    "&:lastChild": {
      paddingTop: 0,
      paddingBottom: `${theme.spacing(4)}px`,
    },
  },
  mapContainer: {
    height: "350px",
    //width: "100%",
  },
}));

// Will be helpful for getting live user locations for map.
// window.navigator.geolocation.getCurrentPosition(console.log, console.log)

const UserMap = () => {
  const classes = useStyles();
  const theme = useTheme();
  const options = {
    map: "world_mill",
    regionStyle: {
      initial: {
        fill:
          theme.palette.type === "dark"
            ? "rgba(255, 255, 255, 0.3)"
            : "#e3eaef",
      },
    },
    backgroundColor: "transparent",
    containerStyle: {
      width: "100%",
      height: "100%",
    },
    markerStyle: {
      initial: {
        r: 9,
        fill: theme.palette.secondary.main,
        "fill-opacity": 1,
        stroke: "#fff",
        "stroke-width": 7,
        "stroke-opacity": 0.4,
      },
      hover: {
        stroke: "#fff",
        "fill-opacity": 1,
        "stroke-width": 1.5,
      },
    },
    zoomOnScroll: false,
    markers: [
      {
        latLng: [39.904202, 116.407394],
        name: "Beijing",
      },
      {
        latLng: [28.70406, 77.102493],
        name: "Delhi",
      },
      {
        latLng: [41.00824, 28.978359],
        name: "Istanbul",
      },
      {
        latLng: [40.7127837, -74.0059413],
        name: "New York",
      },
      {
        latLng: [34.052235, -118.243683],
        name: "Los Angeles",
      },
      {
        latLng: [41.878113, -87.629799],
        name: "Chicago",
      },
      {
        latLng: [51.507351, -0.127758],
        name: "London",
      },
      {
        latLng: [55.755825, 37.617298],
        name: "Moscow",
      },
      {
        latLng: [40.416775, -3.70379],
        name: "Madrid",
      },
    ],
  };
  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title="Live Users"
      />
      <CardContent className={classes.cardContent}>
        <div className={classes.mapContainer}>
          <VectorMap {...options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserMap;

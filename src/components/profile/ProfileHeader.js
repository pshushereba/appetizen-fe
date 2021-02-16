import React from "react";
import default_header from "../../assets/profile_default_header.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { Card, IconButton, Grid } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  imgContainer: {
    height: "200px",
    width: "100%",
  },
  card: {
    margin: theme.spacing(3),
    background: `url(${default_header}) center`,
    backgroundSize: "cover",
    height: "200px",
    width: "100%",
  },
}));

const ProfileHeader = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container={true} justify="center" xs={12} md={8} lg={10}>
        <Card className={classes.card}>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Card>
      </Grid>
    </>
  );
};

export default ProfileHeader;

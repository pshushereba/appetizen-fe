import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  useParams,
  useRouteMatch,
  useHistory,
  Link,
  Switch,
  Route,
} from "react-router-dom";
import ProfileAbout from "./ProfileAbout.js";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    margin: theme.spacing(3),
  },
}));

const ProfileContentNav = (props) => {
  const { path, url } = useRouteMatch();
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Grid item={true} xs={12} md={10} lg={10}>
        <Card className={classes.card}>
          <List>
            <ListItem button component={Link} to={`${url}/about`}>
              About
            </ListItem>
            <ListItem button>Videos</ListItem>
            <ListItem button>Photos</ListItem>
            <ListItem button>Recipes</ListItem>
          </List>
        </Card>
      </Grid>
    </>
  );
};

export default ProfileContentNav;

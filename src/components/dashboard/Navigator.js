import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";
import InboxIcon from "@material-ui/icons/Inbox";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import AssessmentIcon from "@material-ui/icons/Assessment";
import ExploreIcon from "@material-ui/icons/Explore";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddBoxIcon from "@material-ui/icons/AddBox";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useParams, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  listContainer: {
    backgroundColor: theme.palette.secondary.main,
    height: "100%",
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover, &:focus": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
  },
}));

const Navigator = (props) => {
  const { setMenuItem, ...other } = props;
  const classes = useStyles();
  const history = useHistory();
  const { username } = useParams();

  return (
    <>
      <Drawer variant="permanent" setMenuItem={setMenuItem} {...other}>
        <List className={classes.listContainer}>
          <ListItem
            component={Link}
            onClick={() => {
              history.push(`/${username}/profile`);
            }}
          >
            <Avatar>P</Avatar>
          </ListItem>
          <ListItem
            button
            className={classes.item}
            component={Link}
            onClick={() => {
              setMenuItem("overview");
              history.push(`/${username}/dashboard`);
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>
          <ListItem
            button
            className={classes.item}
            component={Link}
            onClick={() => {
              setMenuItem("live");
              history.push(`/${username}/${props.roomId}`);
            }}
          >
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText>Go Live</ListItemText>
          </ListItem>
          <ListItem
            button
            className={classes.item}
            component={Link}
            onClick={() => {
              setMenuItem("explore");
              history.push(`/${username}/explore`);
            }}
          >
            <ListItemIcon>
              <ExploreIcon />
            </ListItemIcon>
            <ListItemText>Explore</ListItemText>
          </ListItem>
          <ListItem
            button
            className={classes.item}
            component={Link}
            onClick={() => {
              setMenuItem("inbox");
              history.push(`/${username}/inbox`);
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText>Inbox</ListItemText>
          </ListItem>
          <ListItem
            button
            className={classes.item}
            component={Link}
            onClick={() => {
              setMenuItem("notifications");
              history.push(`/${username}/notifications`);
            }}
          >
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText>Notifications</ListItemText>
          </ListItem>
          <ListItem
            button
            className={classes.item}
            component={Link}
            onClick={() => {
              setMenuItem("videos");
              history.push(`/${username}/videos`);
            }}
          >
            <ListItemIcon>
              <YouTubeIcon />
            </ListItemIcon>
            <ListItemText>My Videos</ListItemText>
          </ListItem>
          <ListItem
            button
            className={classes.item}
            component={Link}
            onClick={() => {
              setMenuItem("analytics");
              history.push(`/${username}/analytics`);
            }}
          >
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText>Analytics</ListItemText>
          </ListItem>
          <ListItem
            button
            className={classes.item}
            component={Link}
            onClick={() => {
              setMenuItem("subscribers");
              history.push(`/${username}/subscribers`);
            }}
          >
            <ListItemIcon>
              <SubscriptionsIcon />
            </ListItemIcon>
            <ListItemText>Subscribers</ListItemText>
          </ListItem>
          <ListItem
            button
            className={classes.item}
            component={Link}
            onClick={() => {
              setMenuItem("settings");
              history.push(`/${username}/settings`);
            }}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navigator;

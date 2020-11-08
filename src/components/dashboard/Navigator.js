import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({}));

const Navigator = (props) => {
  const { classes, ...other } = props;
  return (
    <div>
      <Drawer variant="permanent" {...other}>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Inbox</ListItem>
          <ListItem>Notifications</ListItem>
          <ListItem>Platform</ListItem>
          <ListItem>My Videos</ListItem>
          <ListItem>Analytics</ListItem>
          <ListItem>Subscribers</ListItem>
          <ListItem>Settings</ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Navigator;

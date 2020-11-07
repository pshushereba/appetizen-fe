import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

const Navigator = (props) => {
  return (
    <div>
      <Drawer variant="permanent">
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

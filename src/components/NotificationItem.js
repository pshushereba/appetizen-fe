import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  SvgIcon,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const NotificationItem = ({ title, description, Icon }) => {
  return (
    <>
      <ListItem divider component={Link} to="#">
        <ListItemAvatar>
          <Avatar>
            <SvgIcon fontSize="small">
              <Icon />
            </SvgIcon>
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={title}
          primaryTypographyProps={{
            variant: "subtitle2",
          }}
          secondary={description}
        />
      </ListItem>
    </>
  );
};

export default NotificationItem;

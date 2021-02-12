import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PersonIcon from "@material-ui/icons/Person";
import NotificationItem from "./NotificationItem.js";

const useStyles = makeStyles((theme) => ({
  popover: {
    ".MuiPaper-root": {
      width: "400px",
      border: `1px solid ${theme.palette.common.white}`,
    },
  },
  notificationBox: {
    textAlign: "center",
    borderBottom: "1px solid black",
  },
  notificationBadge: {
    ".MuiBadge-badge": {
      background: theme.header.indicator.background,
      color: theme.palette.common.white,
      "& span": {
        background: theme.header.indicator.background,
      },
    },
  },
}));

const NotificationDropdown = () => {
  const classes = useStyles();
  const theme = useTheme();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton color="inherit" ref={ref} onClick={handleOpen}>
          <Badge badgeContent={1} className={classes.notificationBadge}>
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        className={classes.popover}
      >
        <Box className={classes.notificationBox}>
          <Typography variant="subtitle1">1 New Notification</Typography>
        </Box>
        <List disablePadding>
          <NotificationItem
            title="New Subscriber"
            description="Mayra subscribed to your channel"
            Icon={PersonIcon}
          />
        </List>
      </Popover>
    </>
  );
};

export default NotificationDropdown;

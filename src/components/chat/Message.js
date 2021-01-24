import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, List, ListItem, Grid } from "@material-ui/core";

const Message = (props) => {
  return (
    <>
      <ListItem button>
        <Typography variant="body2" gutterBottom="true">
          {props.message}
        </Typography>
      </ListItem>
    </>
  );
};

export default Message;

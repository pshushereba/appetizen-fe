import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Typography } from "@material-ui/core";
import { initiateChatSocket } from "../../utils/socketHelpers.js";

const Chat = (props) => {
  // const viewerChatSocket = initiateChatSocket(username, roomId);

  return (
    <div>
      <TextField placeholder="Send a Message"></TextField>
      <Button>Send</Button>
    </div>
  );
};

export default Chat;

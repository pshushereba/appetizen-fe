import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Typography } from "@material-ui/core";
import { initiateChatSocket, sendMessage } from "../../utils/socketHelpers.js";

const Chat = (props) => {
  const [message, setMessage] = useState("");
  const viewerChatSocket = initiateChatSocket(props.id, props.username);

  const handleMessage = (event) => {
    event.preventDefault();
    sendMessage;
  };

  return (
    <div>
      <TextField placeholder="Send a Message"></TextField>
      <Button value={message}>Send</Button>
    </div>
  );
};

export default Chat;

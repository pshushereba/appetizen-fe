import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Typography } from "@material-ui/core";
import {
  initiateChatSocket,
  sendMessage,
  subscribeToChat,
  loadInitialChat,
} from "../../utils/socketHelpers.js";

const Chat = ({ username, roomId, socket }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  // const viewerChatSocket = initiateChatSocket(props.id, props.username);
  console.log("chat", chat);
  useEffect(() => {
    loadInitialChat((err, data) => {
      if (err) return;

      if (data !== null) {
        setChat(data);
      }
    });
  }, []);

  useEffect(() => {
    subscribeToChat((err, data) => {
      if (err) return;

      setChat([data, ...chat]);
    });
  }, [roomId]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  console.log(message);

  const handleMessage = (event) => {
    sendMessage(roomId, message);
  };

  return (
    <div>
      <TextField
        placeholder="Send a Message"
        value={message}
        onChange={handleChange}
      ></TextField>
      <Button
        onClick={() => {
          setChat([message, ...chat]);
          sendMessage(roomId, message);
        }}
      >
        Send
      </Button>
      {chat ? chat.map((m, i) => <p key={i}>{m}</p>) : ""}
    </div>
  );
};

export default Chat;

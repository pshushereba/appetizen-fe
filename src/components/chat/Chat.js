import React, { useState, useEffect, useRef } from "react";
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

  console.log("chat", chat);
  useEffect(() => {
    loadInitialChat((err, data) => {
      if (err) return;

      if (data !== null) {
        //setChat([message, ...chat]);
        setChat(data);
      }
    });
  }, [roomId]);

  useEffect(() => {
    subscribeToChat((err, data) => {
      if (err) return;
      console.log("in subscribeToChat", data, chat);

      setChat([...chat, data]);
    });
  }, [chat]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

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
          setChat([...chat, message]);
          sendMessage(roomId, message);
          setMessage("");
        }}
      >
        Send
      </Button>
      {chat ? chat.map((m, i) => <p key={i}>{m}</p>) : ""}
    </div>
  );
};

export default Chat;

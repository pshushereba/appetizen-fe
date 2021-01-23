import React, { useState, useEffect, useRef, useCallback } from "react";
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

      handleMessage(data);
      //setChat([...chat, data]);
    });
  }, []);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleMessage = useCallback((data) => {
    setChat(() => [...chat, data]);
  });

  return (
    <div>
      <TextField
        placeholder="Send a Message"
        value={message}
        onChange={handleChange}
      ></TextField>
      <Button
        onClick={() => {
          handleMessage(message);
          //setChat([...chat, message]);
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

export const MemoizedChat = React.memo(Chat);

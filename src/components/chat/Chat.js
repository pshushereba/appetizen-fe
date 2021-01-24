import React, { useState, useEffect, useRef, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { appendMessate, isTyping, notTyping } from "../../actions/index.js";
import Message from "./Message.js";
import {
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  Grid,
} from "@material-ui/core";
import {
  initiateChatSocket,
  sendMessage,
  subscribeToChat,
  loadInitialChat,
} from "../../utils/socketHelpers.js";

const useStyles = makeStyles((theme) => ({
  messageContainer: {
    height: "16.75rem",
    paddingBottom: "2rem",
    overflow: "scroll",
  },
}));

const Chat = ({ username, roomId, socket }) => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const dispatch = useDispatch();

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

  // Socket event handlers

  // socket.on("typing", (data) => {
  //   dispatch(isTyping(data));
  // });

  // socket.on("new_message", (data) => {
  //   dispatch(appendMessage(data));
  // });

  // socket.on("not_typing", (data) => {
  //   dispatch(notTyping(data));
  // })

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleMessage = useCallback((data) => {
    setChat(() => [...chat, data]);
  });

  const handleTyping = () => {};

  return (
    <>
      <Grid container={true} direction="column">
        <List className={classes.messageContainer}>
          {chat ? chat.map((m, i) => <Message message={m} key={i} />) : ""}
        </List>
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
      </Grid>
    </>
  );
};

export const MemoizedChat = React.memo(Chat);

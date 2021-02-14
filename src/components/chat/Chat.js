import React, { useState, useEffect, useRef, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import {
  appendMessage,
  isTyping,
  notTyping,
  clearChat,
} from "../../actions/index.js";
import Message from "./Message.js";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  Grid,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  initiateChatSocket,
  sendMessage,
  subscribeToChat,
  loadInitialChat,
  disconnectSocket,
} from "../../utils/socketHelpers.js";

const useStyles = makeStyles((theme) => ({
  messageContainer: {
    height: "16.75rem",
    paddingBottom: "2rem",
    marginBottom: "1rem",
    overflow: "scroll",
    backgroundColor: "#e3e3e3",
  },
}));

const Chat = ({ username, roomId, socket, history }) => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  console.log(history);

  useEffect(() => {
    loadInitialChat((err, data) => {
      if (err) return;

      if (data !== null) {
        //setChat([message, ...chat]);
        // Need to pull the message history from the server and then dispatch the action to update the store.
        setChat(data);
      }
    });

    socket.on("typing", (data) => {
      dispatch(isTyping(data));
    });

    socket.on("new_message", (data) => {
      dispatch(appendMessage(data));
    });

    socket.on("not_typing", (data) => {
      dispatch(notTyping(data));
    });
  }, [roomId]);

  useEffect(() => {
    subscribeToChat((err, data) => {
      if (err) return;
      console.log("in subscribeToChat", data, chat);

      //handleMessage(data);
      //setChat([...chat, data]);
    });

    return function cleanup() {
      disconnectSocket();
      dispatch(clearChat());
    };
  }, []);

  // Socket event listeners. Will dispatch actions based on events from other connected users.

  // socket.on("typing", (data) => {
  //   dispatch(isTyping(data));
  // });

  // socket.on("new_message", (data) => {
  //   dispatch(appendMessage(data));
  // });

  // socket.on("not_typing", (data) => {
  //   dispatch(notTyping(data));
  // });

  // Functions to handle changes for current user.

  const handleChange = (event) => {
    setMessage(event.target.value);
    if (event.target.value !== "") {
      handleTyping();
    } else {
      handleNotTyping();
    }
  };

  const handleMessage = useCallback((data) => {
    if (message === "") {
      setError("There is no message.");
      return;
    }
    setError("");
    socket.emit("new_message", message);
    // setChat(() => [...chat, data]);
  });

  const handleTyping = () => {
    socket.emit("typing", {
      username: username,
    });
  };

  const handleNotTyping = () => {
    socket.emit("not_typing", {
      username: username,
    });
  };

  return (
    <>
      <Card>
        <CardHeader
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
        />
        <CardContent>
          <List className={classes.messageContainer}>
            {history
              ? history.map((m, i) => <Message message={m} key={i} />)
              : ""}
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
        </CardContent>
      </Card>
      {/* <Grid container={true} direction="column">
        
      </Grid> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    history: state.Chat.messages,
  };
};

export const MemoizedChat = React.memo(connect(mapStateToProps, {})(Chat));

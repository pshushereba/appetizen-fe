import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import io from "socket.io-client";
const cors = require("cors");

const SERVER = "https://appetizen-media.herokuapp.com/testing";
// const SERVER = "http://localhost:5000/testing";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

const Video = () => {
  const classes = useStyles();
  const [myRoom, setMyRoom] = useState("");
  const socket = io(SERVER, { transports: ["websocket"] });
  console.log(socket);
  socket.on("connection", () => {
    console.log("connecting to server");
  });

  const getRoomID = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:5000/")
      .then((res) => {
        console.log(res);
        setMyRoom(res.data);
      })
      .catch((err) => console.log(err));
  };

  const joinRoom = (e) => {
    e.preventDefault();
    socket.emit("join-room", () => {
      console.log(`I'm connected with the back-end`);
    });
    // axios
    //   .get(`http://localhost:5000/api/videos/${myRoom}`)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  };

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <button onClick={getRoomID}>Get new room</button>
          <button onClick={joinRoom}>Join Room</button>
          <video></video>
        </Grid>
        <Grid item></Grid>
        <Grid item></Grid>
      </Grid>
    </div>
  );
};

export default Video;

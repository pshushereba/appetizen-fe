import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import socketClient from "socket.io-client";
const cors = require("cors");

// const SERVER = "https://appetizen-media.herokuapp.com/";
const SERVER = "http://localhost:5000/";

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
  const socket = socketClient(SERVER);

  socket.on("connection", () => {
    socket.emit("join-room", () => {
      console.log(`I'm connected with the back-end`);
    });
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

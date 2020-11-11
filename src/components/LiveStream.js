import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core/Grid";
import axios from "axios";
import io from "socket.io-client";
import { PlayArrow } from "@material-ui/icons";

const LiveStream = () => {
  const [chat, setChat] = useState([]);
  const [videoStream, setVideoStream] = useState(null);
  const videoSocket = io("http://localhost:5000/video", {
    transports: ["websocket"],
  });
  const chatSocket = io("http://localhost:5000/chat", {
    transports: ["websocket"],
  });

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setVideoStream(stream);
      });
  }, []);

  videoSocket.on("connection", () => {
    videoSocket.emit("the client is connected");
  });
  console.log(videoStream);

  return (
    <div>
      <h1>LiveStream</h1>
      <video muted={true} src={videoStream} width="250" autoplay />
    </div>
  );
};

export default LiveStream;

import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import io from "socket.io-client";
import { PlayArrow } from "@material-ui/icons";
import Chat from "./chat/Chat.js";

let videoGrid;

function addVideoStream(vs, cs, video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
}

const LiveStream = ({ roomId }) => {
  const [chat, setChat] = useState([]);
  const [videoStream, setVideoStream] = useState(null);

  const videoSocket = io("http://localhost:5000/video", {
    transports: ["websocket"],
  });
  videoSocket.emit("chat-message", "yo");
  const chatSocket = io("http://localhost:5000/chat", {
    transports: ["websocket"],
  });

  console.log(roomId);

  useEffect(() => {
    videoGrid = document.getElementById("video-grid");
    const myVideo = document.createElement("video");
    myVideo.muted = true;
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        addVideoStream(videoSocket, chatSocket, myVideo, stream);
      });
  }, []);

  // videoSocket.on("connection", (socket) => {
  //   socket.emit(socket);
  // });
  // console.log(videoStream);

  return (
    <>
      <Grid container spacing={10}>
        <Grid item sm={6}>
          <div id="video-grid"></div>
        </Grid>
        <Grid item sm={3}>
          <Chat />
        </Grid>
      </Grid>
    </>
  );
};

export default LiveStream;

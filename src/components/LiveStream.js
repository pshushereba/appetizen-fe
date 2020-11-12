import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core/Grid";
import axios from "axios";
import io from "socket.io-client";
import { PlayArrow } from "@material-ui/icons";

let videoGrid;

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
}
console.log(videoGrid);

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
    videoGrid = document.getElementById("video-grid");
    const myVideo = document.createElement("video");
    myVideo.muted = true;
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        addVideoStream(myVideo, stream);
      });
  }, []);

  videoSocket.on("connection", () => {
    videoSocket.emit("the client is connected");
  });
  // console.log(videoStream);

  return (
    <div id="video-grid">
      {/* <h1>LiveStream</h1> */}
      <div></div>
      {/* <video muted={true} src={videoStream} width="250" autoplay /> */}
    </div>
  );
};

export default LiveStream;

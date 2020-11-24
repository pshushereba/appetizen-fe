import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { PlayArrow } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import Chat from "../chat/Chat.js";
import {
  initiateVideoSocket,
  initiateChatSocket,
  disconnectSocket,
} from "../../utils/socketHelpers.js";

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
  const { username } = useParams();

  console.log(username);
  // const videoSocket = io("http://localhost:5000/video", {
  //   transports: ["websocket"],
  // });

  const videoSocket = initiateVideoSocket(roomId);

  // videoSocket.emit("chat-message", "yo");

  // const chatSocket = io("http://localhost:5000/chat", {
  //   transports: ["websocket"],
  // });

  const chatSocket = initiateChatSocket(roomId, username);

  console.log(roomId);

  useEffect(() => {
    videoGrid = document.getElementById("video-grid");
    const myVideo = document.createElement("video");
    const configOptions = { video: true, audio: true };
    myVideo.muted = true;
    navigator.mediaDevices.getUserMedia(configOptions).then((stream) => {
      addVideoStream(videoSocket, chatSocket, myVideo, stream);
    });

    return function cleanup() {
      disconnectSocket();
    };
  }, []);

  return (
    <>
      <Grid container justify="space-between" spacing={10}>
        <Grid item xs={8} sm={6}>
          <div id="video-grid"></div>
        </Grid>
        <Grid item sm={4}>
          <Chat roomId={roomId} />
        </Grid>
      </Grid>
    </>
  );
};

export default LiveStream;

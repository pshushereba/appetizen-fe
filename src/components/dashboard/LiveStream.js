import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { PlayArrow } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import StreamControls from "../video/StreamControls.js";
import Chat from "../chat/Chat.js";
import {
  initiateVideoSocket,
  initiateChatSocket,
  disconnectSocket,
} from "../../utils/socketHelpers.js";

let videoGrid;

// Set up array to hold chunks of video data

let chunks = [];

// Set up options for media recorder instance

const mediaRecorderOptions = { mimeType: "video/webm;codecs=h264" };

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
  const [mediaRecorder, setMediaRecorder] = useState(null);

  console.log(username);
  // const videoSocket = io("http://localhost:5000/video", {
  //   transports: ["websocket"],
  // });

  // const videoSocket = initiateVideoSocket(roomId);
  const videoSocket = null;

  // const chatSocket = io("http://localhost:5000/chat", {
  //   transports: ["websocket"],
  // });
  console.log(mediaRecorder);

  const chatSocket = initiateChatSocket(roomId, username);

  console.log(roomId);

  useEffect(() => {
    videoGrid = document.getElementById("video-grid");
    const myVideo = document.createElement("video");
    const configOptions = { video: true, audio: true };
    myVideo.muted = true;
    navigator.mediaDevices
      .getUserMedia(configOptions)
      .then((stream) => {
        addVideoStream(videoSocket, chatSocket, myVideo, stream);
        setupMediaRecorder(stream);
      })
      .catch((err) => console.log(err));

    return function cleanup() {
      disconnectSocket();
    };
  }, []);

  const setupMediaRecorder = (mediaStream) => {
    setMediaRecorder(new MediaRecorder(mediaStream, mediaRecorderOptions));
  };

  return (
    <>
      <Grid container justify="space-between" spacing={10}>
        <Grid item xs={8} sm={6}>
          <div id="video-grid"></div>
          <StreamControls mediaRecorder={mediaRecorder} />
        </Grid>
        <Grid item sm={4}>
          <Chat username={username} roomId={roomId} socket={chatSocket} />
        </Grid>
      </Grid>
    </>
  );
};

export default LiveStream;

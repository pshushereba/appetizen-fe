import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { PlayArrow } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import StreamControls from "../video/StreamControls.js";
import { connect } from "react-redux";
import Chat from "../chat/Chat.js";
import {
  initiateVideoSocket,
  initiateChatSocket,
  disconnectSocket,
} from "../../utils/socketHelpers.js";

let videoGrid;
let viewerVideoGrid;
const peers = {};

// Set up array to hold chunks of video data

let chunks = [];

// Set up options for media recorder instance

const mediaRecorderOptions = { mimeType: "video/webm;codecs=h264" };

const LiveStream = ({
  username,
  roomId,
  peer,
  peerId,
  videoSocket,
  chatSocket,
}) => {
  const [videoStream, setVideoStream] = useState(null);
  //const { username } = useParams();
  const [mediaRecorder, setMediaRecorder] = useState(null);
  console.log("in LiveStream peer", peer);
  // const videoSocket = initiateVideoSocket(roomId, username, peerId);

  // const chatSocket = initiateChatSocket(roomId, username);
  console.log(videoSocket);
  videoSocket.emit("streaming", (roomId, username, peerId));

  videoSocket.on("viewer-connected", (id, viewer, viewerPeerId) => {
    console.log("in viewer-connected", id, viewer, viewerPeerId);
    console.log(videoStream);
    connectToNewViewer(viewerPeerId, videoStream);
    //videoSocket.emit("send-stream", videoStream);
  });

  useEffect(() => {
    //console.log("useEffect in LiveStream called");
    videoGrid = document.getElementById("video-grid");
    viewerVideoGrid = document.getElementById("viewer-grid");
    const myVideo = document.createElement("video");
    const configOptions = { video: true, audio: true };
    myVideo.muted = true;
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(configOptions);
        setVideoStream(stream);
        setupMediaRecorder(stream);
        addVideoStream(videoSocket, chatSocket, myVideo, stream);
      } catch (err) {
        console.error(err);
      }
    }

    if (!videoStream) {
      enableStream();
    } else {
      return function cleanup() {
        videoStream.getTracks().forEach((track) => {
          track.stop();
        });
        disconnectSocket();
      };
    }
  }, [videoStream]);

  useEffect(() => {
    function finalizeMediaRecorderSetup() {
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
    }

    if (mediaRecorder) {
      finalizeMediaRecorderSetup();
    }
  }, [mediaRecorder]);

  function connectToNewViewer(viewerId, stream) {
    console.log("in connectToNewViewer peer", peer, viewerId, stream);
    const call = peer.call(viewerId, stream);
    console.log("in connectToNewViewer", call);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) => {
      addViewerStream(video, userVideoStream);
    });
    call.on("close", () => {
      video.remove();
    });

    peers[viewerId] = call;
  }

  function addVideoStream(vs, cs, video, stream) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    videoGrid.append(video);
  }

  function addViewerStream(vs, cs, video, stream) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    viewerVideoGrid.append(video);
  }

  const stoppedVideo = (e) => {
    mediaRecorder.onstop = (e) => {
      // Generate a blob object to represent our video data.
      const blob = new Blob(chunks, { type: "video/webm" });

      // Create a URL that points to our video in browser memory.
      //console.log("chunks", chunks);
      const video_url = window.URL.createObjectURL(blob);
      //console.log(video_url);
      // Reset the chunk data
      chunks = [];

      // Turn off streamer camera and microphone
      e.target.stream.getTracks().forEach((track) => track.stop());
    };
  };

  const setupMediaRecorder = (mediaStream) => {
    setMediaRecorder(new MediaRecorder(mediaStream, mediaRecorderOptions));
  };

  return (
    <>
      <Grid container direction="column" justify="space-between" spacing={10}>
        <Grid container>
          <Grid item xs={8} sm={6}>
            <div id="video-grid"></div>
            <StreamControls
              mediaRecorder={mediaRecorder}
              stoppedVideo={stoppedVideo}
            />
          </Grid>
          <Grid item sm={4}>
            <Chat username={username} roomId={roomId} />
          </Grid>
        </Grid>
        <Grid container>
          <div id="viewer-grid"></div>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    peerId: state.User.peer.id,
    peer: state.User.peer,
    roomId: state.Stream.reservedRoom,
    username: state.User.username,
  };
};

export const MemoizedLiveStream = React.memo(
  connect(mapStateToProps, {})(LiveStream)
);

import React, { useState, useEffect, useRef } from "react";
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
  // Set the user's video stream in state once given permission on component load
  const [videoStream, _setVideoStream] = useState(null);
  const videoStreamRef = useRef(videoStream);
  const setVideoStream = (data) => {
    videoStreamRef.current = data;
    _setVideoStream(data);
  };
  // Set up a media recorder instance so that the user can record their video.
  const [mediaRecorder, setMediaRecorder] = useState(null);

  // When a viewer connects, this event is emitted and the streamer will connect to the viewer.
  videoSocket.on("viewer-connected", (id, viewer, viewerPeerId) => {
    console.log("in viewer-connected event", videoStream);
    console.log(videoStream.current);
    connectToNewViewer(viewerPeerId, videoStream);
  });

  useEffect(() => {
    videoGrid = document.getElementById("video-grid");
    viewerVideoGrid = document.getElementById("viewer-grid");
    const myVideo = document.createElement("video");
    const configOptions = { video: true, audio: false };
    myVideo.muted = true;
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(configOptions);
        console.log("in stream useEffect", stream);
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

  console.log("mediaRecorder sanity check.", mediaRecorder);
  console.log("below useEffect videoStream", videoStream);

  // Function to connect to new viewer using PeerJS. Inputs are the peerID of the viewer, and the streamer's video stream to send
  // to the viewer.
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

  // Function to add the streamer's video to the LiveStream component on load. Called after permission is given to access the
  // camera and mic.
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

  const setupVideoStream = (mediaStream) => {
    setVideoStream(mediaStream);
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
// export default connect(mapStateToProps, {})(LiveStream);

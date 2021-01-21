import React, { useState, useEffect, useRef, useContext } from "react";
import { PeerContext } from "../../contexts/index.js";
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
let videoSocket;
let viewerVideoGrid;
const peers = {};
//let chatSocket;
// Set up array to hold chunks of video data

let chunks = [];

const mediaRecorderOptions = { mimeType: "video/webm;codecs=h264" };

const LiveStream = ({ username, roomId }) => {
  // Set the user's video stream in state once given permission on component load
  const [videoStream, _setVideoStream] = useState(null);
  const [socketRegistered, setSocketRegistered] = useState(false);
  const videoStreamRef = useRef(videoStream);
  const setVideoStream = (data) => {
    videoStreamRef.current = data;
    _setVideoStream(data);
  };
  const chatSocket = initiateChatSocket(roomId, username);
  const peer = useContext(PeerContext);
  console.log("peer from PeerContext", peer);

  // Set up a media recorder instance so that the user can record their video.
  const [mediaRecorder, setMediaRecorder] = useState(null);

  useEffect(() => {
    videoGrid = document.getElementById("video-grid");
    viewerVideoGrid = document.getElementById("viewer-grid");
    const myVideo = document.createElement("video");
    const configOptions = { video: true, audio: false };
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
    videoSocket = initiateVideoSocket(roomId, username, peer.id);

    console.log("useEffect videoSocket", videoSocket);
    // When a viewer connects, this event is emitted and the streamer will connect to the viewer.
    videoSocket.on("viewer-connected", (id, viewer, viewerPeerId) => {
      console.log("inside videoSocket listener", id, viewer, viewerPeerId);
      connectToNewViewer(viewerPeerId, videoStream);
    });
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

  // Function to connect to new viewer using PeerJS. Inputs are the peerID of the viewer, and the streamer's video stream to send
  // to the viewer.
  function connectToNewViewer(viewerId, stream) {
    console.log("in connectToNewViewer", viewerId);
    const call = peer.call(viewerId, stream);
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
      const video_url = window.URL.createObjectURL(blob);
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
        <Grid container spacing={8}>
          <Grid item={true} xs={8} sm={6}>
            <div id="video-grid"></div>
            <StreamControls
              mediaRecorder={mediaRecorder}
              stoppedVideo={stoppedVideo}
            />
          </Grid>
          <Grid item={true} sm={4}>
            <Chat username={username} roomId={roomId} socket={chatSocket} />
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
    //peerId: state.User.peer.id,
    //peer: state.User.peer,
    roomId: state.Stream.reservedRoom,
    username: state.User.username,
  };
};

export const MemoizedLiveStream = React.memo(
  connect(mapStateToProps, {})(LiveStream)
);
// export default connect(mapStateToProps, {})(LiveStream);

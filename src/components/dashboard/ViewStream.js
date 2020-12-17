import React, { useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import {
  initiateChatSocket,
  initiateVideoSocket,
} from "../../utils/socketHelpers.js";
import Chat from "../chat/Chat.js";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

const ViewStream = ({ username }) => {
  const history = useHistory();
  const { id } = useParams();
  const location = useLocation();
  let streamerVideoDiv;

  const viewerVideoSocket = initiateVideoSocket(id, username);
  // console.log(viewerVideoSocket);

  viewerVideoSocket.on("connection", (socket) => {
    socket.emit("viewer-connected", (id, username));
  });

  viewerVideoSocket.on("send-stream", (stream) => {
    streamerVideoDiv = document.getElementById("streamer-video");
    const content = document.createElement("video");
    console.log("stream in ViewStream", stream);
    content.srcObject = stream;
    content.addEventListener("loadedmetadata", () => {
      content.play();
    });
    streamerVideoDiv.append(content);
  });

  const viewerChatSocket = initiateChatSocket(id, username);
  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <h1>Test</h1>
          <div id="streamer-video"></div>
        </Grid>
        <Grid item>
          <Chat username={username} roomId={id} socket={viewerChatSocket} />
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.User.username,
  };
};

export default connect(mapStateToProps, {})(ViewStream);

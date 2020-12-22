import React, { useEffect } from "react";
import {
  useHistory,
  useParams,
  useLocation,
  withRouter,
} from "react-router-dom";
import {
  initiateChatSocket,
  initiateVideoSocket,
} from "../../utils/socketHelpers.js";
import Chat from "../chat/Chat.js";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

const ViewStream = (props) => {
  const history = useHistory();
  // const { id } = useParams();
  const location = useLocation();
  const foo = props.match.params.id;
  let streamerVideoDiv;

  const viewerVideoSocket = initiateVideoSocket(
    props.match.params.id,
    props.username
  );
  // console.log(viewerVideoSocket);
  console.log("location state", props.match.params.id);

  viewerVideoSocket.emit("viewer-connected", foo, props.username);

  // viewerVideoSocket.on("connection", (socket) => {
  //   socket.emit("viewer-connected", (id, username));
  // });

  viewerVideoSocket.on("send-stream", (stream) => {
    console.log("send stream fired in viewer", stream);
    streamerVideoDiv = document.getElementById("streamer-video");
    const content = document.createElement("video");
    console.log("stream in ViewStream", stream);
    content.srcObject = stream;
    content.addEventListener("loadedmetadata", () => {
      content.play();
    });
    streamerVideoDiv.append(content);
  });

  const viewerChatSocket = initiateChatSocket(
    props.match.params.id,
    props.username
  );
  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <h1>Test</h1>
          <div id="streamer-video"></div>
        </Grid>
        <Grid item>
          <Chat
            username={props.username}
            roomId={props.match.params.id}
            socket={viewerChatSocket}
          />
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

export default withRouter(connect(mapStateToProps, {})(ViewStream));

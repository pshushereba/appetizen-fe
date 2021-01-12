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

const ViewStream = ({
  videoSocket: viewerVideoSocket,
  chatSocket: viewerChatSocket,
  peer,
  streamerPeerId,
  ...props
}) => {
  const history = useHistory();
  // const { id } = useParams();
  const location = useLocation();
  const foo = props.match.params.id;
  const viewerPeer = peer;
  // const streamerPeerId = streamerPeerId;

  let streamerVideoDiv;

  // const viewerVideoSocket = initiateVideoSocket(
  //   props.match.params.id,
  //   props.username,
  //   props.viewerPeerId
  // );

  //console.log(props.match.params);
  //console.log("location state", props.match.params.id);

  viewerVideoSocket.emit("viewer-connected", foo, props.username, peer.id);

  // viewerVideoSocket.on("connection", (socket) => {
  //   socket.emit("viewer-connected", (id, username));
  // });

  viewerPeer.on("call", (call) => {
    call.answer();
    call.on("stream", (stream) => {
      streamerVideoDiv = document.getElementById("streamer-video");
      const content = document.createElement("video");
      content.srcObject = stream;
      content.addEventListener("loadedmetadata", () => {
        content.play();
      });
      streamerVideoDiv.append(content);
    });
  });

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
    viewerPeerId: state.User.peer.id,
    peer: state.User.peer,
  };
};

export default withRouter(connect(mapStateToProps, {})(ViewStream));
